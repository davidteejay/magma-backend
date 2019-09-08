import jwt from 'jsonwebtoken';
import Responses from './Responses';
import bcrypt from 'bcryptjs';

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

  static async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  /**
   * @method buildErrorResponse
   * @description Set error response
   * @static
   * @param {object} data
   * @returns {object} JSON response
   * @memberof Helper
   */
  static buildErrorResponse(data) {
    if (data.error) {
      const allErrors = data.error.details;
      const errors = this.getErrorLabels(allErrors);
      if (errors) {
        Responses.setError(400, errors);
      }
      return errors;
    }
    return null;
  }

  /**
   * @method getErrorLabels
   * @param {object} allErrs
   * @returns {object} JSON response
   * @memberof Helper
   */
  static getErrorLabels(allErrs) {
    const errors = [];
    allErrs.forEach(error => {
      const { context } = error;
      if (error.type !== 'object.allowUnknown') errors.push(context.label);
    });
    const errs = errors.length > 0 ? errors : null;
    return errs;
  }

  /**
   * @method comparePassword
   * @description compare password with database hash password
   * @static
   * @param {string} password
   * @param {string} hashPassword
   * @returns {string} string response
   * @memberof Helper
   */
  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
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
