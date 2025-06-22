// backend/models/Transfer.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transfer = sequelize.define('Transfer', {
    assetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fromBase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toBase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  return Transfer;
};
