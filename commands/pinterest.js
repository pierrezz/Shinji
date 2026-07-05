const axios = require('axios');
const cheerio = require('cheerio');
const { MessageMedia } = require('whatsapp-web.js');

const MAX_URLS = 8;

async function extractImageUrl(pinterestUrl) {
  const response = await axios.get(pinterestUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  const $ = cheerio.load(response.data);
  return $('meta[property="og:image"]').attr('content') || null;
}

module.exports = async (client, message, rawUrls) => {
  if (!rawUrls) {
    await message.reply('Use: !pinterest <url1, url2, ...>\nLimite de 8 urls por vez.');
    return;
  }

  const urls = rawUrls
    .split(',')
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
    .slice(0, MAX_URLS);

  if (urls.length === 0) {
    await message.reply('Nenhuma url válida foi encontrada.');
    return;
  }

  const chat = await message.getChat();
  await chat.sendStateTyping();

  for (const url of urls) {
    try {
      const imageUrl = await extractImageUrl(url);

      if (!imageUrl) {
        await message.reply(`Não foi possível encontrar uma imagem em: ${url}`);
        continue;
      }

      const media = await MessageMedia.fromUrl(imageUrl, { unsafeMime: true });
      await client.sendMessage(message.from, media);
    } catch (error) {
      await message.reply(`Erro ao processar o link: ${url}`);
    }
  }
};
