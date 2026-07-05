const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const youtubeCommand = require('./commands/youtube');
const pinterestCommand = require('./commands/pinterest');
const pingCommand = require('./commands/ping');
const stickerCommand = require('./commands/sticker');
const menuCommand = require('./commands/menu');
const { ensureBinaries } = require('./lib/ytdlp');

const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'shinji-bot' }),
  puppeteer: {
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Shinji está online.');
});

client.on('auth_failure', () => {
  console.log('Falha na autenticação do Shinji.');
});

client.on('disconnected', () => {
  console.log('Shinji foi desconectado.');
});

client.on('message_create', async (message) => {
  const body = message.body ? message.body.trim() : '';
  const lower = body.toLowerCase();

  try {
    if (lower.startsWith('!youtube')) {
      const query = body.slice(8).trim();
      await youtubeCommand(client, message, query);
      return;
    }

    if (lower.startsWith('!pinterest')) {
      const urls = body.slice(10).trim();
      await pinterestCommand(client, message, urls);
      return;
    }

    if (lower === '!ping') {
      await pingCommand(client, message);
      return;
    }

    if (lower === '!s') {
      await stickerCommand(client, message);
      return;
    }

    if (lower === '!menu') {
      await menuCommand(client, message);
      return;
    }
  } catch (error) {
    await message.reply('Ocorreu um erro ao processar o comando.');
  }
});

(async () => {
  console.log('Verificando o yt-dlp...');
  await ensureBinaries();
  client.initialize();
})();
