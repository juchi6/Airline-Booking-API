const express = require("express");
const router = express.Router();
const { AirplaneController } = require("../../controllers");
const { validate, protect, authorize } = require("../../middlewares");
const { createAirplaneSchema } = require("../../validators");

router.post("/", protect, authorize("admin"), validate(createAirplaneSchema), AirplaneController.createAirplane);

module.exports = router;
