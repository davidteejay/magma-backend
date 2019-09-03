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
  static async signup(req, res) {
    const { body } = req;
    try {
      const newUser = await UserService.signup(body);
      const result = {
        id: newUser.id,
        email: newUser.email
      };
      const token = Helper.generateToken(result);
      Responses.setSuccess(201, { token, ...result }, 'user account created successfully');
      return Responses.send(res);
    } catch (error) {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    }
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
  static async updateUserProfile(req, res) {
    const { body, user, params} = req;
    if (!(user.email === params.email)){
      Responses.setError(401, 'You are not allowed to edit this profile');
      return Responses.send(res);
    }
    try {
      let updateUser = await UserService.updateUser(body, user.id, params.email);
      delete updateUser[0].dataValues.password
      Responses.setSuccess(201, updateUser[0], 'user account updated successfully');
      return Responses.send(res);
    } catch (error) {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    }
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
  static async retrieveUserProfile(req, res) {
    const {user, params} = req;
    if (!(user.email === params.email)){
      Responses.setError(401, 'You are not allowed to see this profile');
      return Responses.send(res);
    }
    try {
      let retrieveUser = await UserService.retrieveUser(user.id, params.email);
      delete retrieveUser.dataValues.password
      Responses.setSuccess(200, retrieveUser, 'user account retrieved successfully');
      return Responses.send(res);
    } catch (error) {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    }
  }
}
