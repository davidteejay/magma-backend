import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const secret = process.env.SECRET;

/**
 * @class Helper
 * @description An helper class containing utility methods
 * @exports Helper
 */
export default class Helper {
  /**
   * @method generateToken
   * @description Generates token for securing endpoints
   * @static
   * @param {object} payload - data object
   * @returns {object} JSON response
   * @memberof Helper
   */
  static generateToken(payload) {
    const token = jwt.sign(payload, secret, {
      expiresIn: '24hr',
    });
    return token;
  }

  /**
   * @method hashPassword
   * @description Hash password before saving in the database
   * @static
   * @param {string} password
   * @returns {string} string response
   * @memberof Helper
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * @method verifyToken
   * @description decode token to confirm authentication before a user can manipulate data
   * @static
   * @header {string} token
   * @returns {json} json response
   * @memberof Helper
   */
  static verifyToken(token) {
    const payload = jwt.verify(token, secret, (err, decoded) => decoded);
    return payload;
  }
}
