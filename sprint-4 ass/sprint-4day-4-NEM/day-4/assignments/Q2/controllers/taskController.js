const { Task, Subtask } = require('../models');

exports.createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = await Task.create({ title, description, dueDate });
  res.status(201).json(task);
};

