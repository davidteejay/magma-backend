import chai from 'chai';
import sinon from 'sinon';
import sendEmail from '../utils/email';
import Helpers from '../utils/Helper';
import transporter from '../utils/transporter';

const { expect } = chai;
const req = {
  headers: {
    host: '127.0.0.1:3000'
  },
  body: {
    email: 'test@email.com'
  }
};
const email = 'oluwacrypto@gmail.com';
const emailOptions = Helpers.constructResetEmail(req, email);

describe('Email Service', () => {
  describe('sendEmail', () => {
    it('should send an email to provided address', done => {
      const sendEmailSpy = sinon.spy(sendEmail);
      const promise = sendEmailSpy(transporter, emailOptions);
      expect(sendEmailSpy.calledOnce).to.be.equal(true);
      expect(promise).to.be.an.instanceOf(Object);
      done();
    });
  });
});
