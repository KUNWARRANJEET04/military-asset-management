// backend/seeders/seed.js
const { Asset, Purchase, Transfer, Assignment, sequelize } = require('../models');

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // WARNING: This drops and recreates all tables

    // Seed assets
    const assets = await Asset.bulkCreate([
      { name: 'Rifle M16', type: 'Weapon', base: 'Base Alpha', quantity: 50 },
      { name: 'Truck T3', type: 'Vehicle', base: 'Base Bravo', quantity: 10 },
      { name: 'Ammunition Box', type: 'Ammunition', base: 'Base Alpha', quantity: 200 },
    ]);

    // Seed purchases
    await Purchase.bulkCreate([
      { name: 'Rifle M16', type: 'Weapon', base: 'Base Alpha', quantity: 30, date: '2025-06-20' },
      { name: 'Truck T3', type: 'Vehicle', base: 'Base Bravo', quantity: 5, date: '2025-06-18' },
    ]);

    // Seed transfers
    await Transfer.bulkCreate([
      { name: 'Rifle M16', type: 'Weapon', fromBase: 'Base Alpha', toBase: 'Base Bravo', quantity: 10, date: '2025-06-21' },
      { name: 'Ammunition Box', type: 'Ammunition', fromBase: 'Base Alpha', toBase: 'Base Bravo', quantity: 50, date: '2025-06-19' },
    ]);

    // Seed assignments
    await Assignment.bulkCreate([
      { assetName: 'Rifle M16', assignedTo: 'Captain John', unit: 'Infantry', date: '2025-06-21', quantity: 5 },
      { assetName: 'Truck T3', assignedTo: 'Lt. Smith', unit: 'Transport', date: '2025-06-20', quantity: 1 },
    ]);

    console.log('✅ Database seeded successfully.');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
