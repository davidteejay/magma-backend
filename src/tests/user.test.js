import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;
describe('/POST Signup route', () => {
  it('should return an error if user credentials are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        email: 'viola10gmail.com',
        password: 'viola100'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  it('should return an error if email already exists', done => {
    chai
      .request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Jibson',
        lastName: 'Onyekelu',
        email: 'naimatdavid@mail.com',
        password: 'Adeyemo100'
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message').eql('email already in use');
        done(err);
      });
  });
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
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.have.property('message')
          .eql('user account created successfully');
        done(err);
      });
  });
});
describe('/POST Signin route', () => {
  it('should return an error if user credentials are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'viola10gmail.com',
        password: 'viola100'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  it('should return an error if login email is not found', done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'viola102@gmail.com',
        password: 'viola10012'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message').eql('Your email cannot be found in our database.');
        done(err);
      });
  });
  it('should return an error if password is incorrect', done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'frank@gmail.com',
        password: 'Viola10012345',
      })
      .end((err, res) => {
        expect(res).status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message').eql('Your password is incorrect.');
        done(err);
      });
  });
  it('should return an error if email is not verified', done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'viola10@gmail.com',
        password: 'Viola100'
      })
      .end((err, res) => {
        expect(res).status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        done(err);
      });
  });
  it('should sign in a registered user if details are valid', done => {
    chai
      .request(app)
      .post('/api/v1/users/signin')
      .send({
        email: 'frank123@gmail.com',
        password: 'Password12345',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body).to.have.property('message')
          .eql('Login successful.');
        done(err);
      });
  });
});
