const { YtDlp, helpers } = require('ytdlp-nodejs');

const ytdlp = new YtDlp();

async function ensureBinaries() {
  try {
    await helpers.downloadYtDlp();
  } catch (error) {
    console.log('Não foi possível baixar o yt-dlp automaticamente.');
  }

  try {
    await ytdlp.downloadFFmpeg();
  } catch (error) {
    console.log('Não foi possível baixar o FFmpeg automaticamente.');
  }
}

module.exports = { ytdlp, ensureBinaries };
