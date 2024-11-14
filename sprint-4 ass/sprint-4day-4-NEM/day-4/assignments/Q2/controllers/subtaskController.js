const { Subtask } = require('../models');

exports.createSubtask = async (req, res) => {
  const { task_id } = req.body;
  const subtask = await Subtask.create({ task_id });
  res.status(201).json(subtask);
};

