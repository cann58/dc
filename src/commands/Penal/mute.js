const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")

module.exports = {
  name: "mute",
  aliases: ["mute", "sustur"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.mute.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı."));
    let member = message.mentions.members.first() || guild.members.cache.get(args[0]) 
    let reason = args.splice(2).join(" ")
    let sure = args[1]
    if (!member) return channel.send(embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!sure) return channel.send(embed.setDescription(`Öncelikle geçerli bir süre belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!reason) return channel.send(embed.setDescription(`Öncelikle geçerli bir sebep belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    sure
      .replace("s", " Saniye")
      .replace("m", " Dakika")
      .replace("h", " Saat")
      .replace("d", " Gün")
      .replace("w", "Hafta")
    if (config.penals.mute.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.mute.limit) return channel.send("Saatlik mute sınırına ulaştın!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!message.member.hasPermission(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini muteleyemezsin!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));

    message.channel.send((`**${member}** **(${member.id})** kullanıcısı ${author} tarafından başarıyla **"${reason}"** sebebiyle **${sure}** boyunca geçici olarak susturuldu! (Ceza Numarası: \`#${db.fetch(`ceza_${guild.id}`)}\`)`))
    member.roles.add(config.penals.mute.roles)
    db.add(`ceza_${guild.id}`, 1)
    message.react(config.emojis.accept)
    const log = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription(`
      ${member ? member.toString() : member.username} kişisi susturuldu!


      Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
      Kullanıcı: ${member ? member.toString(): member.username} - ${member.id}
      Yetkili: ${author} - ${author.id}
      Sebep: ${reason}
      Tarih: ${moment(Date.now()).format("LLL")}
      `);
    client.channels.cache.get(config.penals.mute.log).send(log);
    db.push(`sicil_${member.id}`, `${author} tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **[MUTE]** cezası almış.`)
    db.add(`points_${member.id}`, config.penals.points.mutepoints);
    db.set(`mute_${member.id}`, true);
    setTimeout(() => {
      if (db.get(`mute_${member.id}`)) {
      member.roles.remove(config.penals.mute.roles)
      client.channels.cache.get(config.penals.mute.log).send(new Discord.MessageEmbed().setColor("GREEN").setTimestamp().setDescription(`${member} kişisiin susturması süresi bittiği için kaldırıldı`))}
    }, ms(sure));
    if (config.penals.mute.limit > 0) {
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)
    }
  }
}