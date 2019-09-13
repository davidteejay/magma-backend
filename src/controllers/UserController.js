import UserService from '../services/UserService';
import Helper from '../utils/Helper';
import Responses from '../utils/Responses';

/**
 * @class
 * @description A container class for all controllers
 * @exports UserController
 */
export default class UserController {
  /**
   * @method
   * @description Implements signup endpoint
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserController
   */
  static signup(req, res) {
    const user = req.body;
    UserService.signup(user).then(response => {
      const result = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      };
      const token = Helper.generateToken({ id: response.id, email: response.email });
      Responses.setSuccess(201, 'user account created successfully', { token, ...result });
      return Responses.send(res);
    }).catch(() => {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    });
  }

  /**
   * @method
   * @description Implements signin endpoint
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserController
   */
  static signin(req, res) {
    const loginCredentials = req.body;
    UserService.signin(loginCredentials).then(response => {
      const token = Helper.generateToken({ 
        id: response.id, email: response.email,
        isVerified: response.isVerified,
        role: response.role,
      });
      Responses.setSuccess(200, 'Login successful.', { token, ...response });
      return Responses.send(res);
    }).catch(() => {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    });
  }

  /**
   * @method updateUserProfile
   * @description Implements userprofile settings endpoint
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserController
   */
  static updateUserProfile(req, res) {
    const { body, user, params } = req;
    if (user.email !== params.email){
      Responses.setError(401, 'You are not allowed to edit this profile');
      return Responses.send(res);
    }
    UserService.updateUser(body, user.id, params.email)
      .then(updateUser => {
        console.log(updateUser)
        delete updateUser[0].dataValues.password;
        Responses.setSuccess(201, updateUser[0], 'user account updated successfully');
        return Responses.send(res);
      }).catch(() => {
          Responses.setError(500, 'database error');
          return Responses.send(res);
      });
  }

  /**
   * @method retrieveUserProfile
   * @description Implements userprofile settings endpoint
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserController
   */
  static retrieveUserProfile(req, res) {
    const {user, params} = req;
    if (user.email !== params.email){
      Responses.setError(401, 'You are not allowed to see this profile');
      return Responses.send(res);
    }
    UserService.retrieveUser(user.id, params.email)
      .then(retrieveUser => {
        delete retrieveUser.dataValues.password;
        Responses.setSuccess(200, retrieveUser, 'user account retrieved successfully');
        return Responses.send(res);
      }).catch(() => {
          Responses.setError(500, 'database error');
          return Responses.send(res);
      });
  }
}
