import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';

process.env.TEST_ENV = 'true';

chai.use(chaiHttp);
const { expect } = chai;

describe('Blog Routes', function() {
  let articleId = null;

  it('should get all articles', function(done) {
    chai.request(app)
      .get('/api/blog')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res._body).to.be.a('object');
        expect(res._body).to.have.property('message');
        expect(res._body).to.have.property('text');
        expect(res._body).to.have.property('payload');
        expect(res._body.message).to.be.equal('success');
        expect(res._body.text).to.be.equal('Запитані дані успішно отримано.');
        expect(res._body.payload[0]).to.have.property('_id');
        expect(res._body.payload[0]).to.have.property('author');
        expect(res._body.payload[0]).to.have.property('title');
        expect(res._body.payload[0]).to.have.property('content');
        expect(res._body.payload[0]).to.have.property('image');
        articleId = res._body.payload[0]._id;

        done();
      });
  });

  it('should get article by id', function(done) {
    chai.request(app)
      .get(`/api/blog/${articleId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res._body).to.be.a('object');
        expect(res._body).to.have.property('message');
        expect(res._body).to.have.property('text');
        expect(res._body).to.have.property('payload');
        expect(res._body.payload).to.be.a('object');
        expect(res._body.message).to.be.equal('success');
        expect(res._body.text).to.be.equal('Запитані дані успішно отримано.');
        expect(res._body.payload).to.have.property('_id');
        expect(res._body.payload).to.have.property('author');
        expect(res._body.payload).to.have.property('title');
        expect(res._body.payload).to.have.property('content');
        expect(res._body.payload).to.have.property('image');

        done();
      });
  });
});
