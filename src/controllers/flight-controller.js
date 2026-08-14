const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { catchAsync } = require("../utils");

const createFlight = catchAsync(async (req, res) => {
    const flight = await FlightService.createFlight({
        flightNumber: req.body.flightNumber,
        airplaneId: req.body.airplaneId,
        departureAirportId: req.body.departureAirportId,
        arrivalAirportId: req.body.arrivalAirportId,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        price: req.body.price
    });
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created a flight",
        data: flight,
        error: {}
    });
});

const getAllFlights = catchAsync(async (req, res) => {
    const flights = await FlightService.getAllFlights();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched flights",
        data: flights,
        error: {}
    });
});

const getFlightById = catchAsync(async (req, res) => {
    const flight = await FlightService.getFlightById(req.params.id);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched flight",
        data: flight,
        error: {}
    });
});

module.exports = { createFlight, getAllFlights, getFlightById };
