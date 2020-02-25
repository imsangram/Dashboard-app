const Joi = require('@hapi/joi');

const loginValidation = async (data) => {
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
}


module.exports.loginValidation = loginValidation;