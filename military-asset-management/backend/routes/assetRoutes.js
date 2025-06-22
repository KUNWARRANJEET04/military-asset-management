const express = require('express');
const router = express.Router();
const { Asset } = require('../models');

// GET all assets
router.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

module.exports = router;
