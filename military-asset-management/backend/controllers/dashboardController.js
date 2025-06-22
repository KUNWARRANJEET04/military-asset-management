// controllers/dashboardController.js
const { Asset, Purchase, Transfer, Assignment } = require('../models');

exports.getDashboardStats = async (req, res) => {
  try {
    const { base, type } = req.query;

    const filters = {};
    if (base) filters.base = base;
    if (type) filters.type = type;

    const assets = await Asset.findAll({ where: filters });
    const purchases = await Purchase.findAll({ where: filters });
    const transfersIn = await Transfer.findAll({ where: { toBase: base } });
    const transfersOut = await Transfer.findAll({ where: { fromBase: base } });
    const assignments = await Assignment.findAll({ where: filters });

    const openingBalance = assets.reduce((acc, a) => acc + a.quantity, 0);
    const purchaseTotal = purchases.reduce((acc, p) => acc + p.quantity, 0);
    const transferInTotal = transfersIn.reduce((acc, t) => acc + t.quantity, 0);
    const transferOutTotal = transfersOut.reduce((acc, t) => acc + t.quantity, 0);
    const assignedTotal = assignments.reduce((acc, a) => acc + (a.quantity || 1), 0); // default to 1 if no quantity

    const netMovement = purchaseTotal + transferInTotal - transferOutTotal;
    const closingBalance = openingBalance + netMovement - assignedTotal;

    res.json({
      openingBalance,
      purchaseTotal,
      transferInTotal,
      transferOutTotal,
      netMovement,
      assignedTotal,
      closingBalance,
    });
  } catch (err) {
    console.error('💥 Dashboard Error:', err); // Add this line
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
