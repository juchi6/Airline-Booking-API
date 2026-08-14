const Joi = require("joi");

const createAirplaneSchema = Joi.object({
    modelNumber: Joi.string().trim().required(),
    capacity: Joi.number().integer().min(1).required(),
});

module.exports = { createAirplaneSchema };
