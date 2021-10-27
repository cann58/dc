const config = require("../../../config.json");

module.exports = {
    name: "kayıtsızlar",
    aliases: ["kayıtsızlar", "kayitsizlar"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (message.member.roles.cache.has(config.penals.ban.staff) && message.member.hasPermission("ADMİNİSTRATOR")) return
        let role =  guild.roles.cache.find(rol => rol.id === config.registration.unregistered)
        channel.send(`Yetkili rollerinde toplam **${role.members.size}** kullanıcı var!`).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}