const { StatusCodes } = require("http-status-codes");
const { FlightRepository, AirplaneRepository, AirportRepository } = require("../repositories");
const AppError = require("../utils/error-handler");

const flightRepository = new FlightRepository();
const airplaneRepository = new AirplaneRepository();
const airportRepository = new AirportRepository();

async function createFlight(data) {
    const { airplaneId, departureAirportId, arrivalAirportId } = data;

    if (departureAirportId === arrivalAirportId) {
        throw new AppError("Departure and arrival airport cannot be the same", StatusCodes.BAD_REQUEST);
    }

    const airplane = await airplaneRepository.get({ id: airplaneId });
    if (!airplane) {
        throw new AppError("Airplane not found", StatusCodes.NOT_FOUND);
    }

    const departureAirport = await airportRepository.get({ id: departureAirportId });
    if (!departureAirport) {
        throw new AppError("Departure airport not found", StatusCodes.NOT_FOUND);
    }

    const arrivalAirport = await airportRepository.get({ id: arrivalAirportId });
    if (!arrivalAirport) {
        throw new AppError("Arrival airport not found", StatusCodes.NOT_FOUND);
    }

    const flight = await flightRepository.create({
        ...data,
        totalSeats: airplane.capacity
    });
    return flight;
}

async function getAllFlights() {
    return flightRepository.getAll();
}

async function getFlightById(id) {
    const flight = await flightRepository.get({ id });
    if (!flight) {
        throw new AppError("Flight not found", StatusCodes.NOT_FOUND);
    }
    return flight;
}

module.exports = { createFlight, getAllFlights, getFlightById };
