const Joi = require("joi");

const createAirportSchema = Joi.object({
    name: Joi.string().trim().min(2).max(150).required(),
    code: Joi.string().trim().uppercase().length(3).required(),
    address: Joi.string().trim().required(),
    cityId: Joi.number().integer().positive().required()
});

module.exports = { createAirportSchema };
