const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const helmet = require('helmet');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API Running');
});

// Use the PORT only once
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
