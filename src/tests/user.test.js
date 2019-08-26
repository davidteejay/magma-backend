import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;
describe('/POST Signup route', () => {
  it('should create a new user if details are valid', done => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Viola',
        lastName: 'Violin',
        email: 'viola10@gmail.com',
        password: 'Viola100'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('user account created successfully');
        done(err);
      });
  });
});
