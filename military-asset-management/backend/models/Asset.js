const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/military_db');

const Asset = sequelize.define('Asset', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  baseId: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

module.exports = Asset;
