const Discord = require("discord.js")
const config = require("../../../config.json");

module.exports = {
    name: "info",
    aliases: ["servers", "serverinfo", "serverbilgi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        channel.send(new Discord.MessageEmbed()
            .setTitle(`Sunucu sayısal istatistikleri:`)
            .setColor("#36393f")
            .setDescription(`
    \`•\` Sunucuda toplam **${guild.memberCount}** kişi bulunmakta.
    \`•\` Son 1 Saatte Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
    \`•\` Son 1 Günde Giren Üyeler  **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
    \`•\` Son 1 Haftada Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
    \`•\` Son 1 Ayda Giren Üyeler **${guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`)
            .setThumbnail(guild.iconURL)
            .setFooter(`Developed by Matthe`)
            .setTimestamp())
    }
};