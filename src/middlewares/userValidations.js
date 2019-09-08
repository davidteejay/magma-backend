import Joi from '@hapi/joi';
import _ from 'lodash';
import Schemas from '../utils/userSchema';
import models from '../database/models';
import Helper from '../utils/Helper';
import roleSchema from '../utils/roleSchema';
import Responses from '../utils/Responses';

/**
 * @function
 * @description Validates user credentials
 * @param {object} path - The signup schema
 * @returns {object} JSON response
 */
const validateUser = path => (req, res, next) => {
  const user = req.body;
  if (_.has(Schemas, path)) {
    const schema = _.get(Schemas, path, 0);
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

const validateEmail = path => (req, res, next) => {
  console.log(req.params)
  const email = req.params;
  if (_.has(Schemas, path)) {
    const schema = _.get(Schemas, path, 0);
    const response = Joi.validate(email, schema, { abortEarly: false });
    if (!response.error) {
      req.params = email;
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
const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const check = await models.User.findOne({ where: { email } });
  if (check) {
    Responses.setError(409, 'email already in use');
    return Responses.send(res);
  }
  next();
};

const validateRole = path => (req, res, next) => {
  console.log(req.params)
  const assignRole = req.body;
  if (_.has(roleSchema, path)) {
    const schema = _.get(roleSchema, path, 0);
    const response = Joi.validate(assignRole, schema, { abortEarly: false });
    if (!response.error) {
      req.body = assignRole;
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
  validateUser, validateEmail, emailExists, validateRole
};
