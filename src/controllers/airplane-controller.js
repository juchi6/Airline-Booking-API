const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

async function createAirplane(req, res) {
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
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "Not able to create a airplane",
            err: error
        });
    }
}

module.exports = {
    createAirplane
};
