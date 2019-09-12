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
      lastName: foundUser.lastName,
      role: foundUser.role
    };
    return user;
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

  /**
   * @method assignRole
   * @description Medium between the database and UserController
   * @static
   * @param {object} userCredentials - data object
   * @returns {object} JSON response
   * @memberof UserService
   */
  static async assignUser(body) {
    const { email, role } = body;
    const getUser = await User.findOne({
      where: {
        email
      }
    });

    if (!getUser) throw new Error('User not found');

    if (getUser.dataValues.isVerified === false) throw new Error('User email is not verified');

    if (getUser.dataValues.role === role) throw new Error('User is already assigned this role');

    await User.update({ role: role }, { where: { email } });

    return 'User Role Assigned Successfully';
  }
}
