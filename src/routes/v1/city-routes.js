const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { validate, protect, authorize } = require("../../middlewares");
const { createCitySchema } = require("../../validators");

router.post("/", protect, authorize("admin"), validate(createCitySchema), CityController.createCity);
router.get("/", CityController.getAllCities);
router.get("/:id", CityController.getCityById);

module.exports = router;
