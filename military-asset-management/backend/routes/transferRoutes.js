// backend/routes/transferRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTransfers,
  createTransfer,
  deleteTransfer,
} = require('../controllers/transferController');

const authorizeRole = require('../middleware/authorizeRole');

router.get('/', authorizeRole(['Admin', 'BaseCommander']), getTransfers);
router.post('/', authorizeRole(['Admin', 'LogisticsOfficer']), createTransfer);
router.delete('/:id', authorizeRole(['Admin']), deleteTransfer);

module.exports = router;
