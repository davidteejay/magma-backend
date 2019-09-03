import Joi from '@hapi/joi';

const name = Joi.string().trim().min(3);
const otherUserFields = Joi.string().trim().allow(null, '');
const email = Joi.string().trim().lowercase().email()
export default {
  signup: Joi.object().keys({
    firstName: name.regex(/^[A-Za-z]+$/).required()
      .label('firstName is required, must be alphabets only and have at least 3 characters'),
    lastName: name.regex(/^[A-Za-z]+$/).required()
      .label('lastName is required, must be alphabets only and have at least 3 characters'),
    email: email.min(3).required()
      .label('email is required, and should follow this format: myemail@domain.com'),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/)
      .label('password is required, must be at least 8 characters and must'
      + ' contain at least a number, one lowercase and one uppercase alphabet'),
  }),
  emailParam: Joi.object().keys({
    email: email
      .label('email is required, and should follow this format: myemail@domain.com'),
  }),
  profile: Joi.object().keys({
    firstName: name
      .label('firstName is required, must be alphabets only and have at least 3 characters'),
    lastName: name
      .label('lastName is required, must be alphabets only and have at least 3 characters'),
    birthDate: Joi.date().iso().allow(null, '')
      .label('date, must be in this format YYYY-MM-DD'),
    prefferedLanguage: otherUserFields
      .label('preffered language can be English, French,..etc'),
    prefferedCurrency: otherUserFields
      .label('preffered currency can be Dollar, Pounds,..etc'),
    gender: Joi.any().valid(['Male', 'Female', 'Other']).allow(null, '')
      .label('gender can be either Male, Female or Other'),
    address: otherUserFields.label('address is required'),
    department: otherUserFields.label('please specify your current department'),
    lineManager: otherUserFields.label('please specify your current line manager'),
    role: otherUserFields.label('please specify your roles'),
    phoneNumber: otherUserFields.regex(/^[0-9]{10,14}$/)
    .label('please only enter a valid phone number'),
  }),
};
