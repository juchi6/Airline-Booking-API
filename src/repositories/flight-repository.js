const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getFlightForUpdate(id, transaction) {
        try {
            const flight = await this.model.findByPk(id, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });
            return flight;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FlightRepository;
