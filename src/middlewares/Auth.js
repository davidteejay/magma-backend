import jwt from 'jsonwebtoken';
import Responses from '../utils/Responses';

/**
 * @class Auth
 * @description A class for user authentication
 * @exports Auth
 */
class Auth {
  /**
   * @method userAuth
   * @description Authenticate a user
   * @static
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   * @memberof Auth
   */
  static async userAuth(req, res, next) {
    const authorization  = req.headers.authorization;
    if (!authorization) {
      Responses.setError(401, 'You are not logged in');
      return Responses.send(res);
    }
    let token = authorization;
    if (token.includes(' ')){
        token = authorization.split(' ')[1];
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      Responses.setError(401, 'Authentication failed');
      return Responses.send(res);
    }
  }
}

export default Auth;
