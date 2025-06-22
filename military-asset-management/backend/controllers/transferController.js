// backend/controllers/transferController.js
const { Transfer } = require('../models');

exports.getTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll();
    res.json(transfers);
  } catch (error) {
    console.error('Error fetching transfers:', error);
    res.status(500).json({ error: 'Failed to fetch transfers' });
  }
};

exports.createTransfer = async (req, res) => {
  try {
    const newTransfer = await Transfer.create(req.body);
    res.status(201).json(newTransfer);
  } catch (error) {
    console.error('Error creating transfer:', error);
    res.status(500).json({ error: 'Failed to create transfer' });
  }
};

exports.deleteTransfer = async (req, res) => {
  try {
    const { id } = req.params;
    await Transfer.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting transfer:', error);
    res.status(500).json({ error: 'Failed to delete transfer' });
  }
};
