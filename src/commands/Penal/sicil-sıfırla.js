const Discord = require('discord.js');
const db = require('quick.db');
const config = require("../../../config.json")
const limit = new Map();
const moment = require("moment");
moment.locale("tr");
const ms = require("ms")
module.exports = {
  name: "sicil-sıfırla",
  aliases: ["sicil-sifirla"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("ADMİNİSTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
  
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!member) channel.send(embed.setDescription(`Öncelikle geçerli bir kullanıcı belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));

if (!member) {
let sicil = db.delete(`sicil_${member.id}`) || [];
channel.send(embed.setDescription(`Sicil verilerin başarıyla silindi!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
}
  
if(member) {
let sicil = db.delete(`sicil_${member.id}`) || [];
channel.send(embed.setDescription(`${member} - \`${member.id}\` kullanıcısının sicil verileri başarıyla ${message.author} tarafından silindi!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));

};
  
}
  

  }
