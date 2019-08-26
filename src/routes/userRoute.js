import express from 'express';
import UserController from '../controllers/UserController';
import validation from '../middlewares/validation';
import userValidations from '../middlewares/userValidations';

const userRoute = express.Router();
const { validate } = validation;

userRoute.post(
  '/users/signup',
  validate('signup'),
  userValidations.emailExists,
  UserController.signup
);

userRoute.post(
  '/users/signin',
  validate('signin'),
  userValidations.validateLogin,
  UserController.signin
);

userRoute
  .post('/users/reset', UserController.resetPassword)
  .get('/users/reset/:token', UserController.updatePassword)
  .patch(
    '/users/reset/:token',
    validate('updatePassword'),
    UserController.updatePassword
  );

export default userRoute;
