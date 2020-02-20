const Joi = require('@hapi/joi');

const registerValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .min(6)
      .email(),
    firstName: Joi.string()
      .required()
      .max(20),
    lastName: Joi.string()
      .required()
      .max(20),
    password: Joi.string()
      .required()
      .min(6)
      .max(100),
    dateOfBirth: Joi.date().required()
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .min(6)
      .email(),
    password: Joi.string()
      .required()
      .min(6)
      .max(100)
  });
  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;