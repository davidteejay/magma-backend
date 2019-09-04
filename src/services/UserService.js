import models from '../database/models';
import Helper from '../utils/Helper';

const { User } = models;

/**
 * @class
 * @description A class containing all services
 * @exports UserService
 */
export default class UserService {
  /**
   * @method signup
   * @description Medium between the database and UserController
   * @static
   * @param {object} userCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async signup(userCredentials) {
    const { password } = userCredentials;
    userCredentials.password = await Helper.hashPassword(password);
    return User.create(userCredentials);
  }
}
