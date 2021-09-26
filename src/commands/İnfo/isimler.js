  const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'isimler',
    aliases: ["names", "nicknames"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || client.fetchUser(args[0])
        if (!member) return channel.error(message, "Öncelikle geçerli bir kullanıcı belirtmelisin!")
        let names = db.get(`isimler_${member.id}`);
        if (!names) return channel.error(message, "Bu kullanıcının veri tabanında isim geçmişi bulunmuyor!")
        channel.send(embed.setTitle("Kullanıcının veri tabanındaki isimleri:").setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n")))
    }
}