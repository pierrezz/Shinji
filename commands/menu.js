module.exports = async (client, message) => {
    const contact = await message.getContact();

    const nome = contact.pushname || contact.name || "Usuário";

    const agora = new Date();

    const hora = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const data = agora.toLocaleDateString("pt-BR");

    const menu = `🌙 *SHINJI BOT*

👤 *@${nome}*
🟢 Online
🕒 ${hora}
📅 ${data}

╭─ 📥 Downloads
│ 🎵 !youtube
│ 📌 !pinterest
│ 🖼️ !s
╰──────────

╭─ ⚙️ Utilidades
│ 📡 !ping
│ 📖 !menu
╰──────────

💜 *Versão:* v1.0.0`;

    await message.reply(menu);
};