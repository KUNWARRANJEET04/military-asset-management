// backend/controllers/assignmentController.js
const { Assignment } = require('../models');

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    await Assignment.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
};
