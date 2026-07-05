module.exports = async (client, message) => {
  const start = Date.now();
  const state = await client.getState();
  const latency = Date.now() - start;

  const status = state === 'CONNECTED' ? 'Online' : 'Offline';

  const text =
    '┌─────「 *SHINJI* 」\n' +
    '│\n' +
    `│  Disponibilidade: *${status}*\n` +
    `│  Latência: *${latency}ms*\n` +
    '│\n' +
    '└──────────────────';

  await message.reply(text);
};
