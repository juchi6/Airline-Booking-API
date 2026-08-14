const CrudRepository = require("./crud-repository");
const { Booking, Flight } = require("../models");

class BookingRepository extends CrudRepository {
    constructor() {
        super(Booking);
    }

    async getBookingsByUserId(userId) {
        try {
            const bookings = await this.model.findAll({
                where: { userId },
                include: [{ model: Flight, as: "flight" }]
            });
            return bookings;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookingRepository;
