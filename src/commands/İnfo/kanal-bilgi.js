const Discord = require("discord.js");
const moment = require('moment');
const config = require("../../../config.json");

module.exports = {
  name: "kanal-bilgi",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    const log = new Discord.MessageEmbed()
.setAuthor('#' + channel.name, guild.iconURL())
.addField(" ID", channel.id)
if (channel.nsfw) {
log.addField(" Uygunsuz İçerik", "Evet", true) 
} 
else {
log.addField(" Uygunsuz İçerik", "Hayır", true)
}
log.addField('Oluşturulduğu Tarih:', moment(channel.createdAt).format('DD/MM/YYYY'), true)
.setThumbnail(guild.iconURL())
.setFooter(`Jahky. ❤️ ${config.Guild.GuilDName}`);
  
channel.send(log)
  }
}