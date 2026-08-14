'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Flight.belongsTo(models.Airplane, { foreignKey: 'airplaneId', as: 'airplane' });
      Flight.belongsTo(models.Airport, { foreignKey: 'departureAirportId', as: 'departureAirport' });
      Flight.belongsTo(models.Airport, { foreignKey: 'arrivalAirportId', as: 'arrivalAirport' });
      Flight.hasMany(models.Booking, { foreignKey: 'flightId', as: 'bookings' });
    }
  }
  Flight.init({
    flightNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    airplaneId: { type: DataTypes.INTEGER, allowNull: false },
    departureAirportId: { type: DataTypes.INTEGER, allowNull: false },
    arrivalAirportId: { type: DataTypes.INTEGER, allowNull: false },
    departureTime: { type: DataTypes.DATE, allowNull: false },
    arrivalTime: { type: DataTypes.DATE, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    totalSeats: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
