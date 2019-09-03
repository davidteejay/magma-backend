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

  /**
   * @method retrieveUser
   * @description Medium between the database and UserController
   * @static
   * @param {object} userCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async retrieveUser(id,email) {
    let user = await User.findOne({returning: true, where: {id, email}});
    return user;
  }

  /**
   * @method updateUser
   * @description Medium between the database and UserController
   * @static
   * @param {object} userCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async updateUser(userCredentials,id,email) {
    const data = userCredentials;
    let user = await User.update( data, {returning: true, where: {id, email}});
    return user[1];
  }
}
