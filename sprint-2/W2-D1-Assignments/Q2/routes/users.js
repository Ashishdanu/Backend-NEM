const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Helper function to validate query parameters
function validateQueryParams(query) {
  const { name, age } = query;
  
  if (age && (isNaN(age) || age < 0)) {
    throw new Error("Age must be a valid number and greater than 0.");
  }
  
  if (name && typeof name !== 'string') {
    throw new Error("Name must be a string.");
  }
}

// GET /api/users - Retrieve users based on optional query parameters (name, age)
router.get('/', async (req, res) => {
  try {
    validateQueryParams(req.query);

    const query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' }; // Case-insensitive name match
    }
    if (req.query.age) {
      query.age = parseInt(req.query.age, 10); // Exact match for age
    }

    const usersCollection = mongoose.connection.collection('users');
    const users = await usersCollection.find(query).toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
