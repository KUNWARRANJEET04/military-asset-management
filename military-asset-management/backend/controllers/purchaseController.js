// backend/controllers/purchaseController.js
const { Purchase } = require('../models');

exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

exports.createPurchase = async (req, res) => {
  try {
    const newPurchase = await Purchase.create(req.body);
    res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Failed to create purchase' });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const { id } = req.params;
    await Purchase.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting purchase:', error);
    res.status(500).json({ error: 'Failed to delete purchase' });
  }
};
