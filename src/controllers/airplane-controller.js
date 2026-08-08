const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

async function createAirplane(req, res, next) {
    console.log("Currently inside controllers/airplane-controller.js");
    try {
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
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    createAirplane
};
