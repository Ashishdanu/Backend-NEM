const { Schema, model } = require();



// Schema - verificvsation
const MovieSchema = new Schema({
  name: String,
  rating: Number,
  cast: [String],
  fenre: String,
});

const Movie = model("movie", MovieSchema);
module.exports = Movie;
