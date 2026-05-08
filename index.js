client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.attachments.size > 0) {
        const attachment = message.attachments.first();

        const url = attachment.url;

        message.reply({
            content: `🔗 Lien direct Discord de l'image :\n${url}`
        });
    }
});