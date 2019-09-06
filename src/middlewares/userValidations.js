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
    const errors = Helper.buildErrorResponse(response);
    if (errors) return Responses.send(res);
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
  models.User.findOne({ where: { email } }).then(data => {
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

export default {
  validateUser, emailExists
};
