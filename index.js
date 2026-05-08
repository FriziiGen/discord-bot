require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();

        message.reply(`🔗 Lien Discord : ${attachment.url}`);
    }
});

client.login(process.env.TOKEN);