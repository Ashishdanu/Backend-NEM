const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);  // Exit process if MongoDB connection fails
  }
};

module.exports = connectDB;
