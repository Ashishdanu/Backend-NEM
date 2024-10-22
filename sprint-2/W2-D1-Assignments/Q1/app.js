const express = require('express');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const app = express();

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/moviestore', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected locally on port 27017'))
.catch(err => console.log(err));

// Routes
app.use('/movies', moviesRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
