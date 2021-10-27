const Discord = require('discord.js')
const ms = require("ms");
const moment = require("moment")

module.exports = {
    name: "sürelirol",
    aliases: ["süreli-rol", "surelirol", "sureli-rol"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const embed1 = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
        const embed2 = new Discord.MessageEmbed()
      .setTimestamp()
      .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
      .setFooter("Developed by Matthe")
        if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(embed1.setDescripton(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        let user = message.mentions.users.first()
        let roles = message.mentions.roles.first()
        if (!args[0]) return message.channel.send(embed1.setDescription(`Öncelikle bir kullanıcı belirtmelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!user) return message.channel.send(embed1.setDescription(`**${args[0]}**, kişisi sunucuda bulunmamakta!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!args[1]) return message.channel.send(embed1.setDescription(`Öncelikle geçerli bir rol etiketlemelisin!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!roles) return message.channel.send(embed1.setDescription(`**${args[1]}**, rolü sunucuda bulunmamakta!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!args[2]) return message.channel.send(embed1.setDescription(`Rolün ne kadar süre içerisinde kullanıcıda kalacağını belirtmelisin.`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        let süre = args[2];
        message.guild.members.cache.get(user.id).roles.add(roles.id)
        message.channel.send(embed2.setDescription(`${user} isimli kişiye ${message.author.username} tarafından ${süre.replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')} boyunca ${roles} rolü verildi!`)).then(mesaj => {
            setTimeout(async () => {
                message.guild.members.cache.get(user.id).roles.remove(roles.id)
                mesaj.edit(embed2.setDescription(`${roles}, için rol süresi doldu!`))
                message.channel.send(embed2.setDescription(`${user} kullanıcısının ${roles} için rol süresi doldu!`))
            }, ms(süre))
        })
    }
}