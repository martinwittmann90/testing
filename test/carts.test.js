import chai from 'chai';
import supertest from 'supertest';
import app from '../src/server.js';

const expect = chai.expect;
const request = supertest(app);

const userWithProperPermissionsAndCartID = {
  role: 'premium',
  email: 'martinwittmann@hotmail.com',
  session: {
    user: {
      cartID: '64f24a453f904f6e0e385dc6', // Reemplaza con un valor válido
    },
  },
};

describe('Cart test', () => {
  it('should add a product to the cart with proper permissions', (done) => {
    request
      .post('/carts/64f24a453f904f6e0e385dc6/product/648a58f7be4e0716e4a6a998')
      .send(userWithProperPermissionsAndCartID)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
