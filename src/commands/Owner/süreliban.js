const Discord = require("discord.js");
const db = require("quick.db")
const ms = require("ms");
const config = require("../../../config.json");
const moment = require("moment")

module.exports = {
  name: "süreliban",
  aliases: ["süreli-ban"],
  owner: true,
  execute: async (client, message, args, embed, author, channel, guild) => {
    let member = message.mentions.users.first();
    let reason = args.slice(1).join(' ');
    if (!member) return message.reply("Öncelikle banlanacak kullanıcıyı belirtmelisin.").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (reason.length < 1) return channel.send(embed.setDescription('Öncelikle geçerli bir sebep belirtmelisin.')).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    let süre = args[1]
    if (!süre) return message.reply("Öncelikle geçerli bir süre belirtin.").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    message.guild.members.ban(member, 2)
    message.channel.send((`**${member}** **(${member.id})** kullanıcısı ${author} tarafından **"${reason}"** sebebiyle sunucudan kalıcı olarak banlandı! (Ceza Numarası: \`#${db.fetch(`ceza_${guild.id}`)}\`)`))
    db.add(`ceza_${message.guild.id}`, 1)
    const log = new Discord.MessageEmbed()
      .setColor("0x00AE86")
      .setTimestamp()
      .addField("Ceza ID", `#${db.fetch(`ceza_${message.guild.id}`)}`)
      .addField('Banlanan:', `${member.username}#${member.discriminator} (${member} - ${member.id})`)
      .addField('Banlayan:', `${message.author.username}#${message.author.discriminator} (${message.author} - ${message.author.id})`)
      .addField('Ban Sebebi', reason)
      .addField("Ban Tarihi", `${moment(Date.now()).format("LLL")}`)
    message.guild.channels.cache.get(config.penals.ban.log).send(log)
    db.push(`sicil_${member.id}`, `${message.author} tarafından ${moment(Date.now()).format("LLL")} tarihinde ${reason} sebebiyle [ SURELI-BAN ] cezası almış.`)
    db.add(`points_${member}`, config.penals.points.banpoints);
    setTimeout(() => {
      message.guild.members.unban(member)
      message.guild.channels.cache.get(config.penals.ban.log).send(`${member} kullanıcısının banının süresi bittiği için banı açıldı!`)
    }, ms(süre))

  }
}