import Joi from '@hapi/joi';
import _ from 'lodash';
import Schemas from '../utils/userSchema';
import Responses from '../utils/Responses';
import models from '../database/models';
import Helper from '../utils/Helper';

/**
 * @function
 * @description Validates user credentials
 * @param {object} path - The signup schema
 * @returns {object} JSON response
 */
const validateUser = path => (req, res, next) => {
  const user = req.body;
  if (_.has(Schemas, path)) {
    const schema = _.get(Schemas, path);
    const response = Joi.validate(user, schema, { abortEarly: false });
    if (!response.error) {
      req.body = user;
    } else {
      const errors = [];
      response.error.details.forEach(error => {
        errors.push(error.context.label);
      });
      Responses.setError(400, errors);
      return Responses.send(res);
    }
  }
  next();
};

/**
 * @function
 * @description Check if email is already exists
 * @param {object} req - Resquest object
 * @param {object} res - Response object
 * @param {object} next
 * @returns {object} JSON response
 */
const emailExists = (req, res, next) => {
  let { email } = req.body;
  email = email.trim().toLowerCase();
  models.Users.findOne({ where: { email } }).then(data => {
    if (data) {
      Responses.setError(409, 'email already in use');
      return Responses.send(res);
    }
    next();
  }).catch(() => {
    Responses.setError(500, 'database error');
    return Responses.send(res);
  });
};

/**
 * @function
 * @description Check if user email exist, password correct and verified
 * @param {object} req - Resquest object
 * @param {object} res - Response object
 * @param {object} next
 * @returns {object} JSON response
 */
const validateLogin = (req, res, next) => {
  let { email } = req.body;
  const { password } = req.body;
  email = email.trim().toLowerCase();
  models.User.findOne({ where: { email } }).then(response => {
    if (!response) {
      Responses.setError(404, 'Your email cannot be found in our database.');
      return Responses.send(res);
    }
    const correctPassword = Helper.comparePassword(password, response.password);
    if (!correctPassword) {
      Responses.setError(401, 'Your password is incorrect.');
      return Responses.send(res);
    }
    if (response.isVerified === false) {
      Responses.setError(401, 'Your email is not verified.');
      return Responses.send(res);
    }
    next();
  });
};

export default {
  validateUser, emailExists, validateLogin
};
