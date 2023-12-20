import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';
import { MESSAGES } from '../src/utils/constants.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Product Routes', function() {
  let productId = null;

  it('should get all products', function(done) {
    chai.request(app)
      .get('/api/product')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        productId = res._body.payload.products[0]._id;

        done();
      });
  });

  it('should get product by id', function(done) {
    chai.request(app)
      .get(`/api/product/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        done();
      });
  });

  it('should get reviews of product by id', function(done) {
    chai.request(app)
      .get(`/api/review/product/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('text');
        expect(res.body).to.have.property('payload');
        expect(res.body.message).to.be.equal('success');
        expect(res.body.text).to.be.equal(MESSAGES.REVIEWS_RETRIEVED_SUCCESSFULLY);
        expect(res.body.payload).to.have.property('reviews');
        expect(res.body.payload).to.be.a('object');

        done();
      });
  });
});
