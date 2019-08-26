import UserService from '../services/UserService';
import Responses from '../utils/Responses';
import Helper from '../utils/Helper';

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
<<<<<<< HEAD
  static signup(req, res) {
    let { firstName, lastName, email } = req.body;
    const { password } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim().toLowerCase();
    const user = {
      firstName, lastName, email, password
    };
    UserService.signup(user).then(response => {
      const result = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName
      };
      const token = Helper.generateToken({ id: response.id, email: response.email });
      Responses.setSuccess(201, 'user account created successfully',
        { token, ...result });
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
      Responses.setSuccess(200, 'Login successful.', response);
      return Responses.send(res);
    }).catch(() => {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    });
=======
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
      const token = Helper.generateToken(result);
      Responses.setSuccess(201, { token, ...result }, 'user account created successfully');
      return Responses.send(res);
    } catch (error) {
      Responses.setError(500, 'database error');
      Responses.send(res);
    }
>>>>>>> feat(signup-api): implement user signup endpoint
  }
}
