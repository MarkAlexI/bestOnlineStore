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
        expect(res._body).to.be.a('object');
        expect(res._body).to.have.property('message');
        expect(res._body).to.have.property('text');
        expect(res._body).to.have.property('payload');
        expect(res._body.message).to.be.equal('success');
        expect(res._body.text).to.be.equal(MESSAGES.ALL_PRODUCTS_IN_PAYLOAD);
        expect(res._body.payload).to.have.property('products');
        expect(res._body.payload).to.have.property('totalProducts');
        expect(res._body.payload.products[0]).to.have.property('_id');
        expect(res._body.payload.products).to.be.a('array');
        expect(res._body.payload.totalProducts).to.be.a('number');

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
