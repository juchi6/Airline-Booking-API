'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Flight, { foreignKey: 'flightId', as: 'flight' });
      Booking.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Booking.init({
    flightId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    noOfSeats: { type: DataTypes.INTEGER, allowNull: false },
    totalCost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: {
      type: DataTypes.ENUM('PENDING', 'BOOKED', 'CANCELLED'),
      allowNull: false,
      defaultValue: 'BOOKED'
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
