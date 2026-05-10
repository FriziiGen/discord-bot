require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.attachments.size > 0) {

        const attachment = message.attachments.first();
        const url = attachment.url;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`copy_${message.id}`)
                .setLabel('Copier le lien')
                .setStyle(ButtonStyle.Secondary)
        );

        // Message EXACT comme tu veux
        await message.reply({
            content: `<${url}>`,
            components: [row]
        });
    }
});

client.on(Events.InteractionCreate, async (interaction) => {

    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('copy_')) {

        const msg = interaction.message.content;

        // retire les < >
        const cleanUrl = msg.replace(/[<>]/g, '');

        await interaction.reply({
            content: cleanUrl,
            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);