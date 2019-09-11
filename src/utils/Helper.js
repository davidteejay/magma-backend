import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Responses from './Responses';

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
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, {
      expiresIn: '1hr',
    });
    return token;
  }

  /**
   * @method verifyToken
   * @description verifies token
   * @static
   * @param {object} token - data object
   * @returns {object} JSON response
   * @memberof Auth
   */
  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  }

  /**
   * @method hashPassword
   * @description Hash password before saving in the database
   * @static
   * @param {string} password - Password to be encrypted
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
   * @param {object} data - Response from Joi validation
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
   * @param {object} allErrs - Array containing all errors
   * @returns {object} JSON response
   * @memberof Helper
   */
  static getErrorLabels(allErrs) {
    const errors = [];
    allErrs.forEach(err => {
      const { context } = err;
      if (err.type !== 'object.allowUnknown' && context.key !== context.label) {
        if (!errors.includes(context.label)) errors.push(context.label);
      }
    });
    const errs = errors.length > 0 ? errors : null;
    return errs;
  }

  /**
   * @method comparePassword
   * @description compare password with database hash password
   * @static
   * @param {string} password - password from the request body
   * @param {string} hashPassword - encrypted password from database
   * @returns {string} string response
   * @memberof Helper
   */
  static comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @method formatRequest
   * @param {object} request - Request body
   * @returns {object} JSON response
   * @memberof Helper
   */
  static formatRequest(request) {
    const {
      origin, destination, reason, accommodation, type
    } = request;
    request.origin = origin.trim();
    request.destination = destination.trim();
    request.type = type.trim();
    request.reason = reason ? reason.trim().replace(/  +/g, ' ') : undefined;
    request.accommodation = accommodation ? accommodation.trim() : undefined;
    return request;
  }

  /**
   * @method noReturn
   * @param {object} depart - Departure date from the database
   * @param {object} travel - Departure date in the request body
   * @returns {object} JSON response
   * @memberof Helper
   */
  static noReturn(depart, travel) {
    const conflicts = [];
    if (depart === travel) {
      conflicts.push(depart);
    }
    return conflicts;
  }

  /**
   * @method withReturn
   * @param {object} travel - Departure date in the request body
   * @param {object} depart - Departure date from the database
   * @param {object} ret - Return date from the database
   * @returns {object} JSON response
   * @memberof Helper
   */
  static withReturn(travel, depart, ret) {
    const conflicts = [];
    ret = ret.toISOString();
    if (travel >= depart && travel <= ret) conflicts.push(depart);
    return conflicts;
  }

  /**
   * @method checkTrip
   * @description Check for trip conflicts
   * @param {object} myRequests - Array of user's request
   * @param {object} travelDate - Departure date in the request body
   * @returns {object} JSON response
   * @memberof Helper
   */
  static checkTrip(myRequests, travelDate) {
    let conflicts;
    myRequests.forEach(request => {
      let { departureDate } = request;
      const { returnDate } = request;
      departureDate = departureDate.toISOString();
      if (!returnDate) conflicts = Helper.noReturn(departureDate, travelDate);
      else conflicts = Helper.withReturn(travelDate, departureDate, returnDate);
    });
    if (conflicts) return conflicts;
    return null;
  }
}
