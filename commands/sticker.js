const sharp = require('sharp');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (client, message) => {
  let media = null;

  if (message.hasMedia) {
    media = await message.downloadMedia();
  } else if (message.hasQuotedMsg) {
    const quoted = await message.getQuotedMessage();
    if (quoted.hasMedia) {
      media = await quoted.downloadMedia();
    }
  }

  if (!media) {
    await message.reply('Envie uma imagem com a legenda !s, ou responda uma imagem com !s.');
    return;
  }

  const inputBuffer = Buffer.from(media.data, 'base64');

  const outputBuffer = await sharp(inputBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  const stickerMedia = new MessageMedia('image/png', outputBuffer.toString('base64'));

  await client.sendMessage(message.from, stickerMedia, {
    sendMediaAsSticker: true,
    stickerAuthor: 'Shinji',
    stickerName: 'Shinji Bot'
  });
};