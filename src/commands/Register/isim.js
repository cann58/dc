const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]
        var age = args[2]
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!"));
        if (!member) return channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!"));
        if (!name) return channel.send(embed.setDescription("Öncelikle geçerli bir isim belirtmelisin!"));
        if (!age) return channel.send(embed.setDescription("Öncelikle geçerli bir yaş belirtmelisin!"));
        if (isNaN(age)) return channel.send(embed.setDescription("Öncelikle yaş geçerli rakamlardan oluşsun!"))
        db.push(`isimler_${member.id}`, ` \`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}\` ( İsim Değiştirme )`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}`);
        channel.send(embed.setDescription(`${member} kullanıcısının ismi başarıyla " \`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}\` " olarak değiştirildi!`));
    }
}