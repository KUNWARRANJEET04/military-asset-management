// backend/routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAssignments,
  createAssignment,
  deleteAssignment,
} = require('../controllers/assignmentController');

const authorizeRole = require('../middleware/authorizeRole');

router.get('/', authorizeRole(['Admin', 'BaseCommander']), getAssignments);
router.post('/', authorizeRole(['Admin', 'BaseCommander']), createAssignment);
router.delete('/:id', authorizeRole(['Admin']), deleteAssignment);

module.exports = router;
