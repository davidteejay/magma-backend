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
   * @method signin
   * @description Signs in user with valid credentials
   * @static
   * @param {object} loginCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async signin(loginCredentials) {
    const { email } = loginCredentials;
    const foundUser = await User.findOne({ where: { email } });
    const user = {
      id: foundUser.id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName
    };
    return user;
  }
}
