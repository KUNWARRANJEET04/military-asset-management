const express = require('express');
const router = express.Router();

const { getDashboardStats } = require('../controllers/dashboardController');
const authenticateJWT = require('../middleware/authenticateJWT'); // ✅ Add this
const authorizeRole = require('../middleware/authorizeRole');

// ⬇️ Use authenticateJWT BEFORE authorizeRole
router.get('/', authenticateJWT, authorizeRole(['Admin', 'Commander']), getDashboardStats);

module.exports = router;
