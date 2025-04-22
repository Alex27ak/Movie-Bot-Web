// bot/services/movieParser.js

const parseMovieData = (message) => {
  // Example of parsing the data you might get from the message
  const movieData = {
    title: message.title || 'Unknown Title',
    year: message.year || 'Unknown Year',
    language: message.language || 'Unknown Language',
    thumbnail: message.thumbnail || 'default_thumbnail.jpg',
    links: message.links || [],
    full_text: message.fullText || 'No description available',
  };

  return movieData;
};

module.exports = {
  parseMovieData,
};
