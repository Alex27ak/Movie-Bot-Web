// bot/models/Movie.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  language: { type: String, required: true },
  thumbnail: { type: String, required: true },
  links: { type: [String], required: true },
  full_text: { type: String, required: true },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
