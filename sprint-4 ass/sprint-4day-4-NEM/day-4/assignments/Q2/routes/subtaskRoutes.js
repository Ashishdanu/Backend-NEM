const express = require('express');
const router = express.Router();
const subtaskController = require('../controllers/subtaskController');
const authenticateToken = require('../middleware/auth');

router.post('/subtasks', authenticateToken, subtaskController.createSubtask);

module.exports = router;
