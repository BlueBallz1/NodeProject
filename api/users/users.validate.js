const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../../configs/regexp.enum');


const userCarSubScheme = Joi.object({
  model: Joi.string().required(),
  color: Joi.string().valid('black','white','red').required()
});

const NewUserScheme = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(64).trim(),
  lastName: Joi.string().alphanum().min(2).max(64).trim(),

  email: Joi.string().regex(EMAIL_REGEXP).required().error(new Error('Email is not valid')),
  password: Joi.string().regex(PASSWORD_REGEXP).required(),

  age: Joi.number().integer().min(1).max(100),
  cars: Joi.array().items(userCarSubScheme).unique().when('girl',{is: true, then: Joi.required()}),
  girl: Joi.boolean()
});

module.exports = {
  NewUserScheme
};
