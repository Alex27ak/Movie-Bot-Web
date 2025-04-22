// bot/models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  downloadLink: { type: String, required: true },
  thumbnail: { type: String, required: true },
  language: { type: String, required: true },
  channelId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Movie', movieSchema);
