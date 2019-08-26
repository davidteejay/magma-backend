import UserService from '../services/UserService';
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
    const {
      firstname, lastname, email, password
    } = req.body;
    const user = {
      firstname, lastname, email, password
    };
    try {
      const newUser = await UserService.signup(user);
      const result = {
        id: newUser.id,
        email: newUser.email
      };
      Responses.setSuccess(201, { result }, 'user account created successfully');
      return Responses.send(res);
    } catch (error) {
      Responses.setError(500, 'database error');
      Responses.send(res);
    }
  }
}
