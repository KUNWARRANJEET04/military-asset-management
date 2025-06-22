const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User')(sequelize);
db.Asset = require('./Asset')(sequelize);
db.Purchase = require('./Purchase')(sequelize);
db.Transfer = require('./Transfer')(sequelize);
db.Assignment = require('./Assignment')(sequelize);

module.exports = db;
