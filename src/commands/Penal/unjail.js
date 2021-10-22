const Discord = require("discord.js");
const db = require("quick.db")
const moment = require("moment");

const config = require("../../../config.json")

module.exports = {
  name: "unjail",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (message.member.roles.has(config.penals.jail.staff) && message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`))
    let member = message.mentions.members.first()
    if (!member) return message.channel.send(embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin!`))
    let rol = await db.get(`roles.${member.id}`);
    let nick = await db.get(`isim.${member.id}`)
    member.roles.set(rol).catch(e => { });
    member.setNickname(nick)
    channel.send(embed.setDescription(`**${member}** **(${member.id})** kullanıcısı başarıyla ${author} tarafından jailden çıkartıldı!`))
    const log = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter("Developed by Matthe")
    .setDescription(`
    ${member ? member.toString: member.username} kullanıcısı karantinadan çıkarıldı!
    
    
    Kullanıcı: ${member ? member.toString: member.username} - ${member.id}
    Yetkili: ${author} - ${author.id}
    Tarih: ${moment(Date.now).format("LLL")}
    `)
    db.set(`jail_${member.id}`, false)
    client.channels.cache.get(config.penals.jail.log).send(log)
    db.delete(`roles.${member.id}`);
    db.delete(`isim.${member.id}`);
  }
}