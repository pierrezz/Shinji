module.exports = async (client, message) => {
  const text =
    '┌─────「 *SHINJI* 」\n' +
    '│\n' +
    '│  *!youtube* <palavras-chave>\n' +
    '│  Busca e envia um vídeo do YouTube\n' +
    '│\n' +
    '│  *!pinterest* <url1, url2, ...>\n' +
    '│  Baixa fotos do Pinterest (máx. 8)\n' +
    '│\n' +
    '│  *!s*\n' +
    '│  Transforma uma imagem em figurinha\n' +
    '│\n' +
    '│  *!ping*\n' +
    '│  Mostra status e latência do bot\n' +
    '│\n' +
    '│  *!menu*\n' +
    '│  Mostra esta lista de comandos\n' +
    '│\n' +
    '└──────────────────\n' +
    'Desenvolvido por @prrxkzz';

  await message.reply(text);
};