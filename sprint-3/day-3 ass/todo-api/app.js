// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
app.use(bodyParser.json());
app.use(rateLimiter);

mongoose.connect('mongodb://localhost:27017/todoApi', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use('/api', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
