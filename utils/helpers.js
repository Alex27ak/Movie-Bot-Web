// bot/utils/helpers.js

// Extract download link from the text
function extractLink(text) {
  const match = text.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
}

// Detect language based on common keywords
function extractLanguage(text) {
  const lower = text.toLowerCase();
  if (lower.includes('tamil')) return 'Tamil';
  if (lower.includes('hindi')) return 'Hindi';
  if (lower.includes('telugu')) return 'Telugu';
  if (lower.includes('malayalam')) return 'Malayalam';
  if (lower.includes('english')) return 'English';
  return 'Unknown';
}

module.exports = { extractLink, extractLanguage };
