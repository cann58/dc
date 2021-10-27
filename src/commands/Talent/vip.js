const config = require("../../../config.json")

module.exports = {
    name: "vip",
    aliases: ["valuable", "very-important-person", "veryimportantperson"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        if (!message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!member) return channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        member.roles.add(config.roles.viprole)
        channel.send(embed.setDescription(`${member} kullancısına başarıyla <@&${config.roles.viprole}> rolü verildi!`))
    }
}