const Movie = require('../../models/movie');

// Simulated parsing logic from text message
function parseMovieMessage(ctx) {
  const text = ctx.message.caption || ctx.message.text;
  const photo = ctx.message.photo?.slice(-1)[0]; // largest image
  const fileId = photo?.file_id;

  if (!text) return null;

  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  let title = '', year = '', languages = [], links = [];

  for (let line of lines) {
    if (line.startsWith('YEAR')) year = line.split(':')[1]?.trim();
    else if (line.startsWith('LANGUAGES')) languages = line.split(':')[1]?.split('+').map(l => l.trim());
    else if (line.includes('http')) {
      const [lang, link] = line.split('-');
      if (lang && link) links.push({ language: lang.trim().toUpperCase(), link: link.trim() });
    } else if (!title) {
      title = line;
    }
  }

  return {
    title,
    year,
    languages,
    downloadLinks: links,
    fileId
  };
}

async function saveParsedMovie(movieData, ctx) {
  if (!movieData?.title) return;

  const imageUrl = movieData.fileId
    ? `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${movieData.fileId}`
    : null;

  const existing = await Movie.findOne({ title: movieData.title });
  if (existing) {
    await Movie.updateOne({ title: movieData.title }, {
      ...movieData,
      thumbnail: imageUrl || existing.thumbnail
    });
    console.log('Updated movie:', movieData.title);
  } else {
    await Movie.create({
      ...movieData,
      thumbnail: imageUrl
    });
    console.log('Saved movie:', movieData.title);
  }
}

module.exports = { parseMovieMessage, saveParsedMovie };