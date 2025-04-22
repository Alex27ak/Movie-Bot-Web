const { fork } = require('child_process');

const server = fork('server.js');
const bot = fork('bot/telegramBot.js');

server.on('exit', code => {
  console.log(`Server exited with code ${code}`);
});

bot.on('exit', code => {
  console.log(`Bot exited with code ${code}`);
});