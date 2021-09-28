const config = require("../../../config.json");

module.exports = {
    name: "kayıtsızlar",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (message.member.roles.cache.has(config.registration.staff) && message.member.hasPermission("ADMİNİSTRATOR")) return
        let role =  guild.roles.cache.find(rol => rol.id === config.registration.unregistered)
        channel.send(`Kayıtsız rolünde toplam **${role.members.size}** kullanıcı var!`);
    }
}