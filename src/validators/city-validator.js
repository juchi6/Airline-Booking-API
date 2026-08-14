const Joi = require("joi");

const createCitySchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
});

module.exports = { createCitySchema };
