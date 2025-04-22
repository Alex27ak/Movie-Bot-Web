const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  message_id: { type: Number, required: true, unique: true },
  title: String,
  year: String,
  language: String,
  full_text: String,
  thumbnail: String,
  links: [String],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
