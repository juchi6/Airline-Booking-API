const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { validate, protect, authorize } = require("../../middlewares");
const { createFlightSchema } = require("../../validators");

router.post("/", protect, authorize("admin"), validate(createFlightSchema), FlightController.createFlight);
router.get("/", FlightController.getAllFlights);
router.get("/:id", FlightController.getFlightById);

module.exports = router;
