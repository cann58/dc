const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../../config.json")

module.exports = {
    name: "ses-kes",
    aliases: ["seskes", "sk", "kes"],
    execute: async (client, message, args, embed, author, channel, guild) => {
  
if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
  
const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if (!member) return channel.send(embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
if(!member.voice.channel) return channel.send(embed.setDescription(`Bağlantısını kesmek istediğiniz kullanıcı sesli odalarda bulunmuyor!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
if(message.member.roles.highest.position <= member.roles.highest.position) return channel.send(embed.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
message.guild.member(member.id).voice.setChannel(null)
 
   channel.send(embed.setDescription(`${member} - \`${member.id}\` kullanıcısının bağlantısı ${message.author} tarafından kesildi!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
}

 }

