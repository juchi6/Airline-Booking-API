const express = require("express");
const router = express.Router();
const { AirplaneRepository } = require("../../repositories");
const { AirplaneController } = require("../../controllers");    

router.post("/", (req, res, next) => {
    console.log("Currently inside routes/v1/airplane-routes.js");
    next();
}, AirplaneController.createAirplane);

module.exports = router;