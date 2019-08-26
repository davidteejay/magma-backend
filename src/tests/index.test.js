import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe('Handle requests on other endpoints', () => {
  it('should return a welcome message', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to Barefoot Nomad');
        done(err);
      });
  });

  it('should return a welcome message for version 1 of the API', done => {
    chai
      .request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Welcome to Barefoot Nomad API');
        done(err);
      });
  });
});
