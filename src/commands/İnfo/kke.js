const db = require("quick.db");

module.exports = {
    name: 'kke',
    aliases: ["kayıt-yetkilisi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!member) return channel.error(message, "Öncelikle geçerli bir kullanıcı belirtmelisin!")
        let kke = db.get(`kke_${member.id}`);
        if (!kke) return channel.error(message, "Bu kullanıcının veri tabanında kayıt verisi bulunmamakta!")
    channel.send(embed.setTitle("Belirttiğiniz kullanıcının veri tabanındaki kayıt görevlisi:").setDescription(`${kke.join("\n")}`))
    }
}