const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { catchAsync } = require("../utils");

const createAirport = catchAsync(async (req, res) => {
    const airport = await AirportService.createAirport({
        name: req.body.name,
        code: req.body.code,
        address: req.body.address,
        cityId: req.body.cityId
    });
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created an airport",
        data: airport,
        error: {}
    });
});

const getAllAirports = catchAsync(async (req, res) => {
    const airports = await AirportService.getAllAirports();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched airports",
        data: airports,
        error: {}
    });
});

const getAirportById = catchAsync(async (req, res) => {
    const airport = await AirportService.getAirportById(req.params.id);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched airport",
        data: airport,
        error: {}
    });
});

module.exports = { createAirport, getAllAirports, getAirportById };
