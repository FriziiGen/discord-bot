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

    // Si message contient une image
    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();

        // IMPORTANT : < > empêche l’aperçu image Discord
        message.reply(`🔗 Lien de l'image : <${attachment.url}>`);
    }
});

client.login(process.env.TOKEN);