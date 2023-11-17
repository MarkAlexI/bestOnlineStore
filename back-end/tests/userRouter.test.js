import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';

process.env.TEST_ENV = 'true';

chai.use(chaiHttp);
const { expect } = chai;

describe('User Routes', function() {
  let userId = null;

  it('should get all users', function(done) {
    chai.request(app)
      .get('/api/user/all')
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
});
