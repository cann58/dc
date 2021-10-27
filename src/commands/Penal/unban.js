const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../../config.json")
moment.locale("tr")
module.exports = {
  name: "unban",
  aliases: ["banremove"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    const permError = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription('Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!').catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    const userError = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription('Öncelikle bir ID belirtmelisiniz!').catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    const userError2 = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription("Herhangi bir ID'de harf kullanılamaz!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    const userError3 = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription('Belirttiğiniz kullanıcı yasaklanmamış!').catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    const levelError = new Discord.MessageEmbed()
      .setColor('#ed455a')
      .setTitle('Hata')
          .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription('Sizinle aynı veya daha yüksek bir role sahip bir üyenin yasağını kaldırmazsınız!').catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (!message.member.hasPermission("BAN_MEMBERS")) return channel.send
      (permError)
    let user = args[0];
    if (!user) return channel.send
      (userError).catch(console.error)
    if (isNaN(args[0])) return channel.send
      (userError2).catch(console.error)
    if (user.highestRole >= author.highestRole) return channel.send
      (levelError)
    const banList = await guild.fetchBans();
    if (!user.id === banList) return channel.send
      (userError3)

    guild.members.unban(user);
    channel.send(`<@!${user}> **(${user})** kullanıcısının yasağı ${author} tarafından başarıyla kaldırıldı!`)
                message.react(config.emojis.accept)
    const log = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
      .setDescription(`
      ${banList.user} üyesinin yasağı kaldırıldı!


      Kullanıcı: ${banList.user} - ${user.id}
      Yetkili: ${author} - ${author.id}
      Tarih: ${moment(Date.now()).format("LLL")}
      `)
    client.channels.cache.get(config.penals.ban.log).send(log);
  }
}