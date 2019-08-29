import express from 'express';
import UserController from '../controllers/UserController';
import userValidations from '../middlewares/userValidations';

const userRoute = express.Router();

userRoute.post('/user/signup',
  userValidations.validateSignup('signup'),
  userValidations.emailExists,
  UserController.signup);

export default userRoute;
