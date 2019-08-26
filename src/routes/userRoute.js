import express from 'express';
import UserController from '../controllers/UserController';
import userValidations from '../middlewares/userValidations';

const userRoute = express.Router();

userRoute.post('/users/signup',
  userValidations.validateUser('signup'),
  userValidations.emailExists,
  UserController.signup);

export default userRoute;
