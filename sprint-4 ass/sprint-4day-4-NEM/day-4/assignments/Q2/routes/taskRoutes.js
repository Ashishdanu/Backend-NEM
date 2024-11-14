const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

router.post('/tasks', authenticateToken, taskController.createTask);

module.exports = router;
