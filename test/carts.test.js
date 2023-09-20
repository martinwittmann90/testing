import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';
import ProductModel from '../src/DAO/models/product.model.js';
import CartModel from '../src/DAO/models/cart.model.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Carrito de compras', () => {
  let productoId;
  let carritoId;
  async function createProduct(done) {
    try {
      const productoDePrueba = new ProductModel({
        title: 'Producto de Prueba',
        description: 'Descripción del Producto de Prueba',
        price: 10,
        thumbnail: 'imagen_del_producto.jpg',
        code: '1001',
        stock: 10,
        category: 'Camisetas',
        status: true,
        owner: 'premium',
      });
      const productoGuardado = await productoDePrueba.save();
      productoId = productoGuardado._id;
      done();
    } catch (error) {
      console.error('Error al crear el producto de prueba:', error);
      done(error);
    }
  }
  async function loginUser(done) {
    const usuarioDePrueba = {
      firstName: 'Usuario',
      lastName: 'De Prueba',
      email: 'usuario@example.com',
      password: 'contraseña',
      role: 'premium',
    };
    try {
      const loginResponse = await chai.request(app).post('/api/sessions/login').send({
        email: usuarioDePrueba.email,
        password: usuarioDePrueba.password,
      });
      expect(loginResponse).to.have.status(200);
      done(usuarioDePrueba);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      done(error);
    }
  }
  before(function (done) {
    this.timeout(3000);
    createProduct(() => {
      const carritoDePrueba = new CartModel({
        products: [
          {
            product: productoId,
            quantity: 1,
          },
        ],
      });

      carritoDePrueba.save((error, carritoGuardado) => {
        if (error) {
          console.error('Error al crear el carrito de prueba:', error);
          done(error);
        } else {
          carritoId = carritoGuardado._id;
          loginUser(() => {
            done();
          });
        }
      });
    });
  });
  it('Debería agregar un producto al carrito', async (done) => {
    const res = await chai.request(app).post(`/api/carts/${carritoId}/product/${productoId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').equal('Producto agregado al carrito con éxito');
    done();
  });
});
