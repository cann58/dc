const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
module.exports = {
    name: "unregistered",
    aliases: ["unreg", "ks", "kayıtsız"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  message.guild.members.cache.get(member.id).roles.cache.forEach(r => {
message.guild.members.cache.get(member.id).roles.remove(r)

})
  member.roles.add((config.registration.unregistered))
  member.roles.add((config.registration.unregistered))
  member.setNickname(config.registration.autonickname);
  message.channel.send(embed.setDescription(`${kullanıcı} - \`${kullanıcı.id}\` kullanıcısı başarıyla ${message.author} tarafından kayıtsıza fırlatıldı!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));

}


  }
