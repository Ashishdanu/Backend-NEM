const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

// Create a movie (POST)
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all movies with filtering, sorting, and pagination (GET)
router.get('/', async (req, res) => {
  try {
    const { q, sortBy, page = 1, limit = 10 } = req.query;
    const query = {};
    
    if (q) {
      query.title = { $regex: q, $options: 'i' };  // Case insensitive search for title
    }

    const options = {
      sort: sortBy ? { [sortBy]: 1 } : {},  // Sorting based on query param
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    };

    const movies = await Movie.paginate(query, options);  // Pagination using mongoose-paginate-v2
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific movie (GET)
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a movie (PUT)
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a movie (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
