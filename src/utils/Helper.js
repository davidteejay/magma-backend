import bcrypt from 'bcrypt';

/**
 * @class Helper
 * @description An helper class containing utility methods
 * @exports Helper
 */
export default class Helper {
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
}
