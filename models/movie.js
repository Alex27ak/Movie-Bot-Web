const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  languages: [String],
  downloadLinks: [{
    language: String,
    link: String
  }],
  thumbnail: String
});

module.exports = mongoose.model('Movie', movieSchema);