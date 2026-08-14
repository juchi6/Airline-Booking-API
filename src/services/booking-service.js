const { StatusCodes } = require("http-status-codes");
const { sequelize } = require("../models");
const { FlightRepository, BookingRepository } = require("../repositories");
const AppError = require("../utils/error-handler");

const flightRepository = new FlightRepository();
const bookingRepository = new BookingRepository();

async function createBooking(data) {
    const { flightId, userId, noOfSeats } = data;

    return sequelize.transaction(async (transaction) => {
        const flight = await flightRepository.getFlightForUpdate(flightId, transaction);
        if (!flight) {
            throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
        }

        if (flight.totalSeats < noOfSeats) {
            throw new AppError("Not enough seats available", StatusCodes.BAD_REQUEST);
        }

        const totalCost = Number(flight.price) * noOfSeats;

        await flight.update(
            { totalSeats: flight.totalSeats - noOfSeats },
            { transaction }
        );

        const booking = await bookingRepository.create(
            { flightId, userId, noOfSeats, totalCost, status: "BOOKED" },
            { transaction }
        );

        return booking;
    });
}

async function getBookingsForUser(userId) {
    return bookingRepository.getBookingsByUserId(userId);
}

async function getAllBookings() {
    return bookingRepository.getAll();
}

module.exports = { createBooking, getBookingsForUser, getAllBookings };
