const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpiration: { type: Date },
  isValidated: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
