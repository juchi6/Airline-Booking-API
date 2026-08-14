const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { catchAsync } = require("../utils");

const createBooking = catchAsync(async (req, res) => {
    const booking = await BookingService.createBooking({
        flightId: req.body.flightId,
        noOfSeats: req.body.noOfSeats,
        userId: req.user.id
    });
    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Successfully created a booking",
        data: booking,
        error: {}
    });
});

const getMyBookings = catchAsync(async (req, res) => {
    const bookings = await BookingService.getBookingsForUser(req.user.id);
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched your bookings",
        data: bookings,
        error: {}
    });
});

const getAllBookings = catchAsync(async (req, res) => {
    const bookings = await BookingService.getAllBookings();
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Successfully fetched bookings",
        data: bookings,
        error: {}
    });
});

module.exports = { createBooking, getMyBookings, getAllBookings };
