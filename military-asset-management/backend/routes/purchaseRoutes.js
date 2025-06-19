const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

// GET /api/purchases
router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

// POST /api/purchases
// POST /api/purchases
router.post('/', async (req, res) => {
  console.log('POST /api/purchases called'); // ✅ Add this
  try {
    const { assetName, quantity, date } = req.body;
    console.log('Received body:', req.body); // ✅ Add this

    const newPurchase = await Purchase.create({ assetName, quantity, date });
    res.status(201).json(newPurchase);
  } catch (err) {
    console.error('Error in POST /api/purchases:', err); // ✅ Add this
    res.status(500).json({ error: 'Failed to create purchase' });
  }
});

// DELETE /api/purchases/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Purchase.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send(); // No content
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  } catch (err) {
    console.error('Error in DELETE /api/purchases/:id:', err);
    res.status(500).json({ error: 'Failed to delete purchase' });
  }
});

// PUT /api/purchases/:id
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type, base, quantity, date } = req.body;

    const purchase = await Purchase.findByPk(id);
    if (!purchase) return res.status(404).json({ error: 'Purchase not found' });

    await purchase.update({ name, type, base, quantity, date });
    res.json(purchase);
  } catch (err) {
    console.error('Failed to update purchase:', err);
    res.status(500).json({ error: 'Failed to update purchase' });
  }
});


module.exports = router;
