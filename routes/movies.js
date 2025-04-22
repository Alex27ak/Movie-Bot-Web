// routes/movies.js

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Fetch all movies with basic fields (title, year, language)
router.get('/', async (req, res) => {
  const movies = await Movie.find({}, 'title year language').sort({ updatedAt: -1 });
  res.json(movies);
});

// Fetch movie by ID to show detailed information
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.json(movie);
});

// Search for movies by title (case-insensitive)
router.get('/search', async (req, res) => {
  const query = req.query.query;
  const regex = new RegExp(query, 'i');
  const movies = await Movie.find({ title: { $regex: regex } }, 'title year language').sort({ updatedAt: -1 });
  res.json(movies);
});

module.exports = router;
