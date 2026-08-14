const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/error-handler");

const cityRepository = new CityRepository();

async function createCity(data) {
    const city = await cityRepository.create(data);
    return city;
}

async function getAllCities() {
    const cities = await cityRepository.getAll();
    return cities;
}

async function getCityById(id) {
    const city = await cityRepository.get({ id });
    if (!city) {
        throw new AppError("City not found", StatusCodes.NOT_FOUND);
    }
    return city;
}

module.exports = { createCity, getAllCities, getCityById };
