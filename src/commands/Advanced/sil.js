module.exports = {
    name: "sil",
    aliases: ["temizle"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return channel.error(message, "Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!");
        if (!args[0]) return channel.error(message, "Öncelikle 1-100 arasında bir rakam belirtiniz.");
        if (isNaN(args[0])) return channel.error(message, "Öncelikle bir sayı belirt!");
        channel.bulkDelete(args[0]).then(() => {
            channel.send(`**${args[0]}** adet mesaj silindi!`)
        })
    }
}