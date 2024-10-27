// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/todos', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.delete('/todos', todoController.batchDeleteTodos);

module.exports = router;
