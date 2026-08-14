const Joi = require("joi");

const createFlightSchema = Joi.object({
    flightNumber: Joi.string().trim().required(),
    airplaneId: Joi.number().integer().positive().required(),
    departureAirportId: Joi.number().integer().positive().required(),
    arrivalAirportId: Joi.number().integer().positive().required(),
    departureTime: Joi.date().iso().required(),
    arrivalTime: Joi.date().iso().greater(Joi.ref("departureTime")).required(),
    price: Joi.number().positive().precision(2).required()
});

module.exports = { createFlightSchema };
