const express = require('express');
const router = express.Router();
const {
  getPurchases,
  createPurchase,
  deletePurchase
} = require('../controllers/purchaseController');

const authorizeRole = require('../middleware/authorizeRole');

router.get('/', authorizeRole(['Admin', 'BaseCommander']), getPurchases);
router.post('/', authorizeRole(['Admin', 'LogisticsOfficer']), createPurchase);
router.delete('/:id', authorizeRole(['Admin']), deletePurchase);

module.exports = router;
