const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");

module.exports = {
  name: "ban",
  aliases: ["yargı", "yarra"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("BAN_MEMBERS")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    let member = message.member
    let user = message.mentions.users.first() || guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(' ');
    if (!user) return channel.send(embed.setDescription('Öncelikle banlanacak kullanıcıyı belirtmelisin.')).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (reason.length < 1) return channel.send(embed.setDescription('Öncelikle geçerli bir sebep belirtmelisin.')).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (config.penals.ban.limit > 0 && limit.has(author.id) && limit.get(author.id) == config.penals.ban.limit) return channel.send(embed.setDescription("Saatlik ban sınırına ulaştın!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!message.member.hasPermission(8) && member && member.roles.highest.position >= message.member.roles.highest.position) return channel.send("Kendinle aynı yetkide ya da daha yetkili olan birini banlayamazsın!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    guild.members.ban(user, { reason: reason });
    message.channel.send((`**${user}** **(${user.id})** kullanıcısı ${author} tarafından **"${reason}"** sebebiyle sunucudan kalıcı olarak banlandı! (Ceza Numarası: \`#${db.fetch(`ceza_${guild.id}`)}\`)`))
    db.add(`ceza_${guild.id}`, 1)

    const log = new Discord.MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription(`
      ${user ? user.toString() : user.username} kişisi sunucudan banlandı!


      Ceza ID: \`${db.fetch(`ceza_${guild.id}`)}\`
      Kullanıcı: ${user ? user.toString() : ""} - ${user.id}
      Yetkili: ${author} - ${author.id}
      Sebep: **${reason}**
      Tarih: ${moment(Date.now()).format("LLL")}
      `)
            message.react(config.emojis.accept)
    client.channels.cache.get(config.penals.ban.log).send(log);
    db.push(`sicil_${user.id}`, `${author} Tarafından ${moment(Date.now()).format("LLL")} tarihinde **${reason}** sebebiyle **[ BAN ]** cezası almış.`)
    db.add(`points_${member}`, config.penals.points.banpoints);
    if (config.penals.ban.limit > 0) {
      if (!limit.has(author.id)) limit.set(author.id, 1);
      else limit.set(author.id, limit.get(author.id) + 1);
      setTimeout(() => {
        if (limit.has(author.id)) limit.delete(author.id);
      }, 1000 * 60 * 60)
    };
  }
};