const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); // Adjust the path as necessary

// Registration endpoint
router.post('/register', UserController.registerUser); // Removed '/users'

// Login endpoint
router.post('/login', UserController.loginUser); // Removed '/users'

module.exports = router;
