// backend/config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('military_db', 'postgres', 'Garima@9', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
