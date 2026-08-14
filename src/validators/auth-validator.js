const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().trim().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
