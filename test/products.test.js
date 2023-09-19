/* import app from '../src/server.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Products API', () => {
    before(function () {
    this.timeout(500000000);
  });

  it('should return a list of products', (done) => {
    chai
      .request(app)
      .get('/api/products')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.msg).to.equal('Products retrieved');
        expect(res.body.payload.docs).to.be.an('array');
        done();
      });
  });
});
 */
