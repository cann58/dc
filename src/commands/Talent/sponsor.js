const config = require("../../../config.json");

module.exports = {
    name: "sponsor",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!"))
        if (!member) return channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!"))
        member.roles.add(config.roles.sponsored)
        channel.send(embed.setDescription(`${member} kullancısına başarıyla <@&${config.roles.sponsored}> rolü verildi!`))
    }
}