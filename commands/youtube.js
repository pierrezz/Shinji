const yts = require('yt-search');
const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { ytdlp } = require('../lib/ytdlp');

module.exports = async (client, message, query) => {
  if (!query) {
    await message.reply('Use: !youtube <palavras-chave>\nExemplo: !youtube Jazzghost Terror');
    return;
  }

  const chat = await message.getChat();
  await chat.sendStateTyping();

  const search = await yts(query);
  const video = search.videos[0];

  if (!video) {
    await message.reply('Nenhum resultado encontrado para essa busca.');
    return;
  }

  const description = video.description && video.description.length > 300
    ? `${video.description.slice(0, 300)}...`
    : (video.description || 'Sem descrição disponível.');

  const caption =
    `*${video.title}*\n\n` +
    `${description}\n\n` +
    `Duração: ${video.timestamp}\n` +
    `Canal: ${video.author.name}\n` +
    `Link: ${video.url}`;

  const thumb = await MessageMedia.fromUrl(video.thumbnail, { unsafeMime: true });
  await client.sendMessage(message.from, thumb, { caption });

  const tempPath = path.join(os.tmpdir(), `${video.videoId}.mp4`);

  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }

  await ytdlp.downloadAsync(video.url, {
    format: { filter: 'audioandvideo', quality: 'lowest', type: 'mp4' },
    output: tempPath
  });

  const stats = fs.statSync(tempPath);
  const sizeMB = stats.size / (1024 * 1024);

  if (sizeMB > 64) {
    fs.unlinkSync(tempPath);
    await message.reply('O vídeo encontrado é muito grande para ser enviado pelo WhatsApp.');
    return;
  }

  const media = MessageMedia.fromFilePath(tempPath);
  await client.sendMessage(message.from, media);

  fs.unlinkSync(tempPath);
};
