import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Signup route', () => {
  it('should return an error if user credentials are invalid', done => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
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
      .post('/api/v1/user/signup')
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
      .post('/api/v1/user/signup')
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

describe('/PATCH Profile Settings route', () => {
  let userToken;
  before((done) => {
    chai.request(app)
      .post('/api/v1/user/signup')
      .send({
        firstName: 'Professor',
        lastName: 'Helsinki',
        email: 'mathyr@gmail.com',
        password: 'viola100L'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  it('should return an error if parameter is not an email', done => {
    chai
      .request(app)
      .patch('/api/v1/user/profile/mathyrgmail.com')
      .set('authorization', userToken)
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        birthDate: '1980-06-25',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Dollar',
        department: 'Administration',
        address: '22,juwon adedokun street',
        lineManager: 'Pius',
        gender: 'Male',
        phoneNumber: '08123465471'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should return an error if user is not authenticated', done => {
    chai
      .request(app)
      .patch('/api/v1/user/profile/mathyr@gmail.com')
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        birthDate: '1980-06-25',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Dollar',
        department: 'Administration',
        address: '22,juwon adedokun street',
        lineManager: 'Pius',
        gender: 'Male',
        phoneNumber: '08123465471'
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  }).timeout(10000);

  it('should return an error if wrong entires for phoneNumber field', done => {
    chai
      .request(app)
      .patch('/api/v1/user/profile/mathyr@gmail.com')
      .set('authorization', userToken)
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        birthDate: '1980-06-25',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Dollar',
        department: 'Administration',
        address: '22,juwon adedokun street',
        lineManager: 'Pius',
        gender: 'Male',
        phoneNumber: '08123asoa'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should return an error if wrong entires for gender field', done => {
    chai
      .request(app)
      .patch('/api/v1/user/profile/mathyr@gmail.com')
      .set('authorization', userToken)
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        birthDate: '1980-06-25',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Dollar',
        department: 'Administration',
        address: '22,juwon adedokun street',
        lineManager: 'Pius',
        gender: 'fcgh',
        phoneNumber: '08181384092'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should return an error if wrong entires for birthDate field', done => {
    chai
      .request(app)
      .patch('/api/v1/user/profile/mathyr@gmail.com')
      .set('authorization', userToken)
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        birthDate: '',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Dollar',
        department: 'Administration',
        address: '22,juwon adedokun street',
        lineManager: 'Pius',
        gender: 'Male',
        phoneNumber: '08181384092'
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('error');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });

  it('should return success if user is authenticated and all inputs are correct', done => {
    chai
      .request(app)
      .patch('/api/v1/user/profile/mathyr@gmail.com')
      .set('authorization', userToken)
      .send({
        firstName: 'Vio9la',
        lastName: 'Vi8olin',
        birthDate: '1980-06-25',
        prefferedLanguage: 'English',
        prefferedCurrency: 'Dollar',
        department: 'Administration',
        address: '22,juwon adedokun street',
        lineManager: 'Pius',
        gender: 'Male',
        phoneNumber: '08181384092'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body).to.have.property('message');
        done(err);
      });
  });
  describe('GET Profile Settings Route', () => {
    it('should return success if user is authenticated', done => {
      chai
        .request(app)
        .get('/api/v1/user/profile/mathyr@gmail.com')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('success');
          expect(res.body).to.have.property('message');
          done(err);
        });
    });
    it('should return error if not user is authenticated', done => {
      chai
        .request(app)
        .get('/api/v1/user/profile/mathyr@gmail.com')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status').eql('error');
          expect(res.body).to.have.property('message');
          done(err);
        });
    });
  });

});
