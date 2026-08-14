const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { catchAsync } = require("../utils");

const createAirplane = catchAsync(async (req, res) => {
    const airplane = await AirplaneService.createAirplane({
        modelNumber: req.body.modelNumber,
        capacity: req.body.capacity
    });
    return res.status(StatusCodes.CREATED).json({
        data: airplane,
        success: true,
        message: "Successfully created a airplane",
        err: {}
    });
});

module.exports = {
    createAirplane
};
