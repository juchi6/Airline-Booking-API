const express = require("express");

const { InfoController } = require("../../controllers");

const airplaneRoutes = require("./airplane-routes");
const authRoutes = require("./auth-routes");
const cityRoutes = require("./city-routes");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/auth", authRoutes);
router.use("/cities", cityRoutes);

router.get("/info", InfoController.info);

module.exports = router;
