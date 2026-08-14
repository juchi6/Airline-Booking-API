const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { validate } = require("../../middlewares");
const { createAirplaneSchema } = require("../../validators");

router.post("/", validate(createAirplaneSchema), AirplaneController.createAirplane);

module.exports = router;
