const express = require("express");

const { InfoController } = require("../../controllers");

const airplaneRoutes = require("./airplane-routes");
const authRoutes = require("./auth-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");
const flightRoutes = require("./flight-routes");
const bookingRoutes = require("./booking-routes");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/auth", authRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);
router.use("/flights", flightRoutes);
router.use("/bookings", bookingRoutes);

router.get("/info", InfoController.info);

module.exports = router;
