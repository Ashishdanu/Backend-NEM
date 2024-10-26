// In authRoutes.js or similar
const express = require('express');
const User = require('../models/User'); // Adjust to your user model
const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check for user and validate password
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Return success response (JWT token, user data, etc.)
        res.status(200).json({ message: 'Login successful', token: 'your_jwt_token_here' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
