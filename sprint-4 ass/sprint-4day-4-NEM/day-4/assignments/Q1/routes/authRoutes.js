const express = require('express');
const router = express.Router();
const { signup, verifyOtp, signin } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/signin', signin);

module.exports = router;
