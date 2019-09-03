import express from 'express';
import UserController from '../controllers/UserController';
import userValidations from '../middlewares/userValidations';
import Auth from '../middlewares/Auth'

const userRoute = express.Router();

userRoute.post('/user/signup',
  userValidations.validateUser('signup'),
  userValidations.emailExists,
  UserController.signup);

userRoute.get('/user/profile/:email',
  userValidations.validateEmail('emailParam'),
  Auth.userAuth,
  UserController.retrieveUserProfile);

userRoute.patch('/user/profile/:email',
  userValidations.validateEmail('emailParam'),
  userValidations.validateUser('profile'),
  Auth.userAuth,
  UserController.updateUserProfile);

export default userRoute;
