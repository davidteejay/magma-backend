import Joi from '@hapi/joi';

/**
  * Role schema to assign roles to user
  */
 export const roleSchema = Joi.object().keys({
    email: Joi.string().email().trim().lowercase()
      .required()
      .error(() => ({
        message: 'Email must be a valid email address e.g example@mail.com',
      })),
    roleId: Joi.number().min(1).max(5)
      .required()
      .error(() => ({
        message: 'Invalid Role Input',
      })),
  });