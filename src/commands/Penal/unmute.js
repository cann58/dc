const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "unmute",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.mute.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!"))
    let member = message.member
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return channel.send(emded.setDescription('Öncelikle susturulması kaldırılacak kullanıcıyı belirtmelisin!'));
    if (member.roles.highest.position >= message.member.roles.highest.position) return channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!");
    user.roles.remove(config.penals.mute.roles);
    channel.send(embed.setDescription(`${member} kullanıcısının susturulması başarıyla ${author} tarafından kaldırıldı!`))
    const log = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setDescription(`
      ${member ? member.toString(): member.username} Kullanıcısının susturması kaldırıldı!

      Yetkili: ${author} - ${author.id}
      Tarih: ${moment(Date.now()).format("LLL")}
      `)
      db.set(`mute_${member.id}`, false)
    client.channels.cache.get(config.penals.mute.log).send(log);
  }
};