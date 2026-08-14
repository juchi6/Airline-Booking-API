const Joi = require("joi");

const createBookingSchema = Joi.object({
    flightId: Joi.number().integer().positive().required(),
    noOfSeats: Joi.number().integer().min(1).required()
});

module.exports = { createBookingSchema };
