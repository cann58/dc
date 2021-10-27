module.exports = {
    name: "sil",
    aliases: ["temizle", "sil"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.error(message, "Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!").catch(err => console.log(err), client.tick(message));
        if (!args[0]) return channel.error(message, "Öncelikle 1-100 arasında bir rakam belirtiniz.").catch(err => console.log(err), client.tick(message));
        if (isNaN(args[0])) return channel.error(message, "Öncelikle geçerli bir sayı belirt!").catch(err => console.log(err), client.tick(message));
        channel.bulkDelete(args[0]).then(() => {
            channel.send(`**${args[0]}** adet mesaj silindi!`).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        })
    }
}