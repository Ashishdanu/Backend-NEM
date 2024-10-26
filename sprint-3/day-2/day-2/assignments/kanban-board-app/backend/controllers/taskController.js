const Task = require('../models/taskModel');

// Get all tasks for a user
const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    user: req.user.id,
  });
  res.status(201).json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
};

// Delete a task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await task.remove();
  res.json({ message: 'Task removed' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
