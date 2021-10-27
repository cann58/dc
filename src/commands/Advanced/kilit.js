module.exports = {
    name: "kilit",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return channel.error(message, "Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı.").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        const content = args[0];

        if (!content) return channel.error(message, "Öncelikle geçerli bir seçenek belirtin! `.kilit aç/kapat`").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));

        if (content === "aç") {
            let every = guild.roles.cache.find(r => r.name === '@everyone');
            channel.createOverwrite(every, {
                'SEND_MESSAGES': null,

            })
            return channel.send(embed.setDescription("Kanal kilidi açıldı!"));
        }

        if (content === "kapat") {
            let every = guild.roles.cache.find(r => r.name === "@everyone");
            channel.createOverwrite(every, {
                SEND_MESSAGES: false
            });
            return channel.send(embed.setDescription("Kanal kilitlendi!"));
        }
    }

}