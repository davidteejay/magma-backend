import UserService from '../services/UserService';
import Responses from '../utils/Responses';
import Helper from '../utils/Helper';
import sendEmail from '../utils/email';
import transporter from '../utils/transporter';
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
      const token = Helper.generateToken({ id: response.id, email: response.email });
      Responses.setSuccess(200, 'Login successful.', { token, ...response });
      return Responses.send(res);
    }).catch(() => {
      Responses.setError(500, 'database error');
      return Responses.send(res);
    });
  }

  /**
   * @method
   * @description Implements password reset endpoint
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserController
   */
  static async resetPassword(req, res) {
    const { email } = req.body;
    const emailOptions = Helper.constructResetEmail(req, email);
    const validUser = await Helper.verifyExistingEmail(email);
    if (validUser) {
      sendEmail(transporter, emailOptions);
      Responses.setSuccess(200, 'a password reset link has been sent to your email');
      return Responses.send(res);
    }
    Responses.setError(400, 'there is no user with such email');
    return Responses.send(res);
  }

  /**
   * @method
   * @description Implements update password controller
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @returns {object} JSON response
   * @memberof UserController
   */
  static async updatePassword(req, res) {
    const { token } = req.params;
    const data = Helper.verifyToken(token);
    const hasExpired = data.expiryDate < Date.now();
    if (hasExpired) {
      Responses.setError(400, 'this address link has expired');
      return Responses.send(res);
    }
    if (req.method === 'GET') {
      Responses.setSuccess(200, 'enter your new email');
      return Responses.send(res);
    }
    const { password } = req.body;
    const [, rowsAffected] = await UserService.resetPassword(password, data.email);
    const {
      id, email, createdAt, updatedAt
    } = rowsAffected;
    Responses.setSuccess(
      200,
      'successfully updated your password',
      {
        id, email, createdAt, updatedAt
      }
    );
    return Responses.send(res);
  }
}
