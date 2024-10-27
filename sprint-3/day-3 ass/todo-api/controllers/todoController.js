// controllers/todoController.js
const Todo = require('../models/Todo');

// Create a TODO item
exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all TODO items
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a TODO item
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a TODO item
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'TODO deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Batch delete TODO items
exports.batchDeleteTodos = async (req, res) => {
  try {
    await Todo.deleteMany({ _id: { $in: req.body.ids } });
    res.json({ message: 'TODOs deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
