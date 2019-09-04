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

  it('should return an error when a wrong url is provided', done => {
    chai
      .request(app)
      .get('/api/v1/mnn')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.be.equal('The requested url was not found on this server');
        done(err);
      });
  });
});
