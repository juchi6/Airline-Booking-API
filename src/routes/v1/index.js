const express = require("express");

const { InfoController } = require("../../controllers");

const airplaneRoutes = require("./airplane-routes");
const authRoutes = require("./auth-routes");
const cityRoutes = require("./city-routes");
const airportRoutes = require("./airport-routes");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/auth", authRoutes);
router.use("/cities", cityRoutes);
router.use("/airports", airportRoutes);

router.get("/info", InfoController.info);

module.exports = router;
