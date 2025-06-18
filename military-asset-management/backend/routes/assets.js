const express = require('express');
const Asset = require('../models/Asset');
const router = express.Router();

// Create Asset
router.post('/assets', async (req, res) => {
  const { type, name, quantity, baseId } = req.body;
  try {
    const asset = await Asset.create({ type, name, quantity, baseId });
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Assets
router.get('/assets', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.status(200).json(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
