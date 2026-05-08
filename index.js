require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        const img = message.attachments.first();
        message.reply(`Lien de ton image : ${img.url}`);
    }
});

client.login(process.env.TOKEN);