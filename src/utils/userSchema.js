import Joi from '@hapi/joi';

export default {
  signup: Joi.object().keys({
    firstname: Joi.string().trim().required().regex(/^[A-Za-z]+$/)
      .min(3)
      .label('firstname is required, must be alphabets only and have at least 3 characters'),
    lastname: Joi.string().trim().required().regex(/^[A-Za-z]+$/)
      .min(3)
      .label('lastname is required, must be alphabets only and have at least 3 characters'),
    email: Joi.string().trim().lowercase().email()
      .required()
      .label('email is required, and should follow this format: myemail@domain.com'),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/)
      .label('password is required, must be at least 8 characters and must'
      + ' contain at least a number, one lowercase and one uppercase alphabet')
  })
};
