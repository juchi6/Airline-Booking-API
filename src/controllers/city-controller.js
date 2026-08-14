const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { catchAsync } = require("../utils");

const createCity = catchAsync(async (req, res) => {
    const city = await CityService.createCity({ name: req.body.name });
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created a city",
        data: city,
        error: {}
    });
});

const getAllCities = catchAsync(async (req, res) => {
    const cities = await CityService.getAllCities();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched cities",
        data: cities,
        error: {}
    });
});

const getCityById = catchAsync(async (req, res) => {
    const city = await CityService.getCityById(req.params.id);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched city",
        data: city,
        error: {}
    });
});

module.exports = { createCity, getAllCities, getCityById };
