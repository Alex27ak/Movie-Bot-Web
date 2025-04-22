const Movie = require('../models/Movie');

// Extract links from text
function extractLinks(text) {
  return [...text.matchAll(/https?:\/\/\S+/g)].map(m => m[0]);
}

// Main parser
function parseMovieMessage(ctx) {
  const isPhoto = ctx.message.photo;
  const text = isPhoto ? ctx.message.caption : ctx.message.text;
  const lines = text.split('\n');

  const title = lines[0]?.trim() || 'Untitled';
  const year = lines.find(l => l.toLowerCase().includes('year'))?.split(':')[1]?.trim() || '';
  const language = lines.find(l => l.toLowerCase().includes('language'))?.split(':')[1]?.trim() || '';
  const thumbnail = isPhoto ? ctx.message.photo.slice(-1)[0].file_id : null;

  return {
    message_id: ctx.message.message_id,
    title,
    year,
    language,
    full_text: text,
    thumbnail,
    links: extractLinks(text)
  };
}

// Save or update movie
async function saveParsedMovie(data, ctx) {
  const existing = await Movie.findOne({ message_id: data.message_id });

  if (existing) {
    await Movie.updateOne({ message_id: data.message_id }, { ...data, updatedAt: new Date() });
  } else {
    await new Movie(data).save();
  }
}

module.exports = { parseMovieMessage, saveParsedMovie };
