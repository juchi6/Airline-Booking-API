const express = require("express");
const router = express.Router();
const { BookingController } = require("../../controllers");
const { validate, protect, authorize } = require("../../middlewares");
const { createBookingSchema } = require("../../validators");

router.post("/", protect, validate(createBookingSchema), BookingController.createBooking);
router.get("/me", protect, BookingController.getMyBookings);
router.get("/", protect, authorize("admin"), BookingController.getAllBookings);

module.exports = router;
