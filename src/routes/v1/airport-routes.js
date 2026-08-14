const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");
const { validate, protect, authorize } = require("../../middlewares");
const { createAirportSchema } = require("../../validators");

router.post("/", protect, authorize("admin"), validate(createAirportSchema), AirportController.createAirport);
router.get("/", AirportController.getAllAirports);
router.get("/:id", AirportController.getAirportById);

module.exports = router;
