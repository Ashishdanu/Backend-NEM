const User = require('../models/userModel');
const { generateOtp } = require('../utils/otpUtil');
const { sendOtpEmail } = require('../utils/emailUtil');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, isValidated: false });
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiration = Date.now() + 10 * 60 * 1000;
    await user.save();
    await sendOtpEmail(email, otp);
    res.status(201).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiration < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    user.isValidated = true;
    user.otp = null;
    user.otpExpiration = null;
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isValidated) {
      return res.status(400).json({ error: 'User not validated' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
