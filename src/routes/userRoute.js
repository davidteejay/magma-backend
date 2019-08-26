import express from 'express';
import UserController from '../controllers/UserController';

const userRoute = express.Router();

userRoute.post('/user/signup', UserController.signup);

export default userRoute;
