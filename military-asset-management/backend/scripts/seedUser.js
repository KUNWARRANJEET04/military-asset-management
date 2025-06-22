// const bcrypt = require('bcryptjs');
// const { sequelize, User } = require('../models');

// const seed = async () => {
//   await sequelize.sync(); // Ensure tables exist

//   const email = 'admin@military.gov';
//   const password = 'admin123';
//   const role = 'Admin';

//   const hash = await bcrypt.hash(password, 10);

//   await User.create({ email, passwordHash: hash, role });
//   await sequelize.sync({ force: true }); // ⚠️ WARNING: Deletes all tables and recreates!

//   console.log(`✅ Admin user created: ${email} / ${password}`);
//   process.exit();
// };

// seed();

// backend/scripts/seedUser.js
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('../models'); // ✅ import User from initialized models

const seed = async () => {
  await sequelize.sync({ force: true }); // WARNING: This deletes all existing data

  const email = 'admin@military.gov';
  const password = 'admin123';
  const role = 'Admin';

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash: hash, role });

  console.log('✅ Admin user created');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
