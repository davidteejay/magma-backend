import express from 'express';
import UserController from '../controllers/UserController';
import userValidations from '../middlewares/userValidations';

const userRoute = express.Router();

userRoute.post(
  '/users/signup',
  userValidations.validateUser('signup'),
  userValidations.emailExists,
  UserController.signup
);

userRoute.post(
  '/users/signin',
  userValidations.validateUser('signin'),
  userValidations.validateLogin,
  UserController.signin
);

export default userRoute;
