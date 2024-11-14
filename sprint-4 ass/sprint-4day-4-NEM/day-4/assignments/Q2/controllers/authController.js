const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = async (req, res) => {
};

exports.login = async (req, res) => {
  const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_SECRET);
  res.json({ token });
};
