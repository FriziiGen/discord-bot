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
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();
        const url = attachment.url;

        // Bouton copier
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`copy_${message.id}`)
                .setLabel('Copier')
                .setStyle(ButtonStyle.Primary)
        );

        // UN SEUL MESSAGE (important)
        await message.reply({
            content: `🔗 Lien de l'image :\n\`${url}\``,
            components: [row]
        });
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('copy_')) {
        // Discord ne peut pas copier automatiquement dans le presse-papier
        // donc on renvoie juste le lien propre
        await interaction.reply({
            content: `📋 Copie ce lien : ${interaction.message.content.match(/`([^`]+)`/)[1]}`,
            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);