const { Telegraf } = require('telegraf');
require('dotenv').config();
const mongoose = require('mongoose');
const { parseMovieMessage, saveParsedMovie } = require('./services/movieParser');

// Initialize bot with token
const bot = new Telegraf(process.env.BOT_TOKEN);

// Parse multiple admin IDs from env
const adminIds = process.env.ADMIN_CHAT_IDS.split(',').map(id => id.trim());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

// Start command
bot.start((ctx) => ctx.reply('Welcome! I am your Movie Telegram Sync Bot.'));

// Handle text and photo messages
bot.on(['text', 'photo'], async (ctx) => {
  try {
    const data = parseMovieMessage(ctx);
    await saveParsedMovie(data, ctx);
    ctx.reply(`✅ Saved/Updated: ${data.title}`);

    // Notify all admins
    for (const adminId of adminIds) {
      try {
        await bot.telegram.sendMessage(
          adminId,
          `🎬 *Movie Saved!*\n\n*Title:* ${data.title}\n*Language:* ${data.language || 'N/A'}`,
          { parse_mode: 'Markdown' }
        );
      } catch (adminErr) {
        console.error(`Error sending message to admin ${adminId}:`, adminErr);
      }
    }
  } catch (err) {
    console.error('Error parsing/saving:', err);
    ctx.reply('⚠️ Error processing this movie post.');
  }
});

// Launch bot
bot.launch().then(() => console.log('Bot is running')).catch(err => console.error('Error launching bot:', err));
