const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Infinite scroll
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const movies = await Movie.find().sort({ _id: -1 }).skip(skip).limit(limit);
  res.json(movies);
});

// Search
router.get('/search', async (req, res) => {
  const query = req.query.q || '';
  const movies = await Movie.find({ title: new RegExp(query, 'i') });
  res.json(movies);
});

module.exports = router;