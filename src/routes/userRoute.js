import express from 'express';
import UserController from '../controllers/UserController';
import userValidations from '../middlewares/userValidations';
import Auth from '../middlewares/Auth';
import permitUser from '../middlewares/permissions'

const userRoute = express.Router();

userRoute.post('/user/signup',
  userValidations.validateUser('signup'),
  userValidations.emailExists,
  UserController.signup);

userRoute.post('/users/signin',
  userValidations.validateUser('signin'),
  userValidations.validateLogin,
  UserController.signin);
userRoute.get('/user/profile/:email',
  userValidations.validateEmail('emailParam'),
  Auth.userAuth,
  UserController.retrieveUserProfile);

userRoute.patch('/user/profile/:email',
  userValidations.validateEmail('emailParam'),
  userValidations.validateUser('profile'),
  Auth.userAuth,
  UserController.updateUserProfile);

userRoute.patch('/user/assignRole',
  Auth.userAuth,
  permitUser(['superAdmin']),
  userValidations.validateRole('assignRole'),
  UserController.assignRole);

export default userRoute;
