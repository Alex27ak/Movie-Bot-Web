// bot/routes/movies.js

const express = require('express');
const Movie = require('../models/Movie'); // Adjusted to match the correct path
const router = express.Router();

// Route to get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from MongoDB
    res.json(movies);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get a specific movie by title
router.get('/:title', async (req, res) => {
  try {
    const movie = await Movie.findOne({ title: req.params.title }); // Find a movie by title
    if (!movie) {
      return res.status(404).send('Movie not found');
    }
    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
