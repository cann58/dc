const db = require("quick.db");
const config = require("../../../config.json")

module.exports = {
    name: 'kayıtsız',
    aliases: ["unregistered", "kayitsiz", "unreg", "unregister", "ks", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const member = message.mentions.members.first() ||guild.members.cache.get(args[0]);
        if (message.member.roles.cache.get(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!"));
        if (!member) return channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!"));
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!"))
        }
        if (member.roles.cache.has(config.roles.boosterrole) && !member.roles.cache.has(config.roles.viprole)) return channel.send(embed.setDescription("Booster ve vip kullanıcıları kayıtsıza atamazsın!"));
      
        let digerroller = [];
        member.roles.cache.filter(r => r.id).map(r => {digerroller.push(r.id)})
        await member.roles.remove(digerroller)
        await member.roles.add(config.registration.unregistered)
        member.setNickname(config.registration.autonickname);

        channel.send(embed.setDescription(`${member} kullanıcısı başarıyla kayıtsıza atıldı!`))
    }
}