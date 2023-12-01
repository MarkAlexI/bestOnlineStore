import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';

process.env.TEST_ENV = 'true';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Routes', function() {
  let authToken = null;
  let userId = null;
  let anonymousId = null;

  it('should sign in a user and get authentication token', function(done) {
    const credentials = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    };

    chai.request(app)
      .post('/api/user/signin')
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('payload');
        authToken = res.body.payload.token;

        done();
      });
  });

  it('should get all users', function(done) {
    chai.request(app)
      .get('/api/user')
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        userId = res._body.payload[0]._id;

        done();
      });
  });

  it('should get user by id', function(done) {
    chai.request(app)
      .get(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        done();
      });
  });

  it('should create anonymous user', function(done) {
    chai.request(app)
      .get('/api/user/reganonymous')
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property('payload');
        anonymousId = res.body.payload._id;

        done();
      });
  });

  it('should delete anonymous user', function(done) {
    chai.request(app)
      .delete(`/api/user/${anonymousId}`)
      .set('Authorization', authToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        done();
      });
  });
});
