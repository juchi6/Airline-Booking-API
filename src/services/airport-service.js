const { StatusCodes } = require("http-status-codes");
const { AirportRepository, CityRepository } = require("../repositories");
const AppError = require("../utils/error-handler");

const airportRepository = new AirportRepository();
const cityRepository = new CityRepository();

async function createAirport(data) {
    const city = await cityRepository.get({ id: data.cityId });
    if (!city) {
        throw new AppError("City not found", StatusCodes.NOT_FOUND);
    }
    const airport = await airportRepository.create(data);
    return airport;
}

async function getAllAirports() {
    return airportRepository.getAll();
}

async function getAirportById(id) {
    const airport = await airportRepository.get({ id });
    if (!airport) {
        throw new AppError("Airport not found", StatusCodes.NOT_FOUND);
    }
    return airport;
}

module.exports = { createAirport, getAllAirports, getAirportById };
