const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String },
  genre: { type: String },
  releaseDate: { type: Date }
});

module.exports = mongoose.model('Movie', movieSchema);
