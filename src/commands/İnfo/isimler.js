  const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: 'isimler',
    aliases: ["names", "nicknames"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0])
        if (!member) return channel.error(message, "Öncelikle geçerli bir kullanıcı belirtmelisin!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        let names = db.get(`isimler_${member.id}`);
        if (!names) return channel.error(message, "Bu kullanıcının veri tabanında isim geçmişi bulunmuyor!").catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        channel.send(embed.setTitle("Kullanıcının veri tabanındaki isimleri:").setDescription(names.map((data, n) => `**${n + 1}.** ${data}`).join("\n"))).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}