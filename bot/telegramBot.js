const { Telegraf } = require('telegraf');
require('dotenv').config();
const mongoose = require('mongoose');
const { parseMovieMessage, saveParsedMovie } = require('./services/movieParser');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome! I am your Movie Telegram Sync Bot.'));

bot.on(['text', 'photo'], async (ctx) => {
  try {
    const data = parseMovieMessage(ctx);
    await saveParsedMovie(data, ctx);
    ctx.reply(`Saved/Updated: ${data.title}`);
  } catch (err) {
    console.error('Error parsing/saving:', err);
    ctx.reply('Error processing this movie post.');
  }
});

bot.launch();