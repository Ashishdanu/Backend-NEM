// server.js
const express = require('express');
const connectDB = require('./config/db');  // Correct import
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();
connectDB(); // Calling the function to connect to MongoDB

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api', require('./routes/bookRoutes'));
app.use('/api', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
