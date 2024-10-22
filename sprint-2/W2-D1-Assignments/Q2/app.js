const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dynamicQueriesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected locally on port 27017'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', usersRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
