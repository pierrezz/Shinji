const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');

const youtubeCommand = require('./commands/youtube');
const pinterestCommand = require('./commands/pinterest');
const pingCommand = require('./commands/ping');
const stickerCommand = require('./commands/sticker');
const menuCommand = require('./commands/menu');
const { ensureBinaries } = require('./lib/ytdlp');

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'shinji-bot'
    }),
    puppeteer: {
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
});

// ==============================
// QR CODE
// ==============================

client.on('qr', (qr) => {
    console.clear();

    console.log(chalk.magenta(`
███████╗██╗  ██╗██╗███╗   ██╗     ██╗██╗
██╔════╝██║  ██║██║████╗  ██║     ██║██║
███████╗███████║██║██╔██╗ ██║     ██║██║
╚════██║██╔══██║██║██║╚██╗██║██   ██║██║
███████║██║  ██║██║██║ ╚████║╚█████╔╝██║
╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚════╝ ╚═╝
`));

    console.log(chalk.yellow("══════════════════════════════════════════════"));
    console.log(chalk.green("📲 Escaneie o QR Code abaixo"));
    console.log(chalk.gray("Aguardando autenticação..."));
    console.log(chalk.yellow("══════════════════════════════════════════════\n"));

    qrcode.generate(qr, { small: true });
});

// ==============================
// BOT ONLINE
// ==============================

client.on('ready', () => {
    console.clear();

    console.log(chalk.magenta(`
███████╗██╗  ██╗██╗███╗   ██╗     ██╗██╗
██╔════╝██║  ██║██║████╗  ██║     ██║██║
███████╗███████║██║██╔██╗ ██║     ██║██║
╚════██║██╔══██║██║██║╚██╗██║██   ██║██║
███████║██║  ██║██║██║ ╚████║╚█████╔╝██║
╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚════╝ ╚═╝
`));

    console.log(chalk.green("══════════════════════════════════════════════"));
    console.log(chalk.green("🟢 STATUS  : ONLINE"));
    console.log(chalk.cyan(`🤖 BOT     : ${client.info.pushname}`));
    console.log(chalk.cyan(`📱 NÚMERO  : ${client.info.wid.user}`));
    console.log(chalk.cyan(`🕒 INÍCIO  : ${new Date().toLocaleString('pt-BR')}`));
    console.log(chalk.gray("🚀 Shinji iniciado com sucesso."));
    console.log(chalk.green("══════════════════════════════════════════════"));
});

// ==============================
// ERRO DE LOGIN
// ==============================

client.on('auth_failure', () => {
    console.log(chalk.red(`
══════════════════════════════════════════════
❌ FALHA NA AUTENTICAÇÃO

A sessão expirou ou foi corrompida.

Apague a pasta auth e conecte novamente.

══════════════════════════════════════════════
`));
});

// ==============================
// DESCONECTADO
// ==============================

client.on('disconnected', (reason) => {
    console.log(chalk.red(`
══════════════════════════════════════════════
🔌 SHINJI DESCONECTADO

Motivo:
${reason}

══════════════════════════════════════════════
`));
});

// ==============================
// COMANDOS
// ==============================

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

        console.error(chalk.red(error));

        await message.reply(
            '❌ Ocorreu um erro ao executar este comando.'
        );
    }
});

// ==============================
// INICIALIZAÇÃO
// ==============================

(async () => {

    console.clear();

    console.log(chalk.blue("🔍 Verificando dependências do yt-dlp..."));

    await ensureBinaries();

    console.log(chalk.green("✔ yt-dlp pronto."));
    console.log(chalk.blue("🚀 Iniciando Shinji...\n"));

    client.initialize();

})();