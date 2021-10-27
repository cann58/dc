const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');
const config = require("../../../config.json");

module.exports = {
    name: "snipe",
    aliases: ["snipe"],
    execute: async (client, message, args, anan, author, channel, guild) => {
        let hembed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RED')
        let embed = new MessageEmbed().setColor('#2F3136')
        let mesaj = db.get(`snipe.${message.guild.id}.${message.channel.id}`);
        if (!mesaj) {
            message.delete({ timeout: 5000 })
            return message.channel.send(hembed.setDescription(`Bu kanalda silinmiş bir mesaj bulunmamakta!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        }
        if (mesaj.icerik.toLowerCase().includes('discord.gg/') || mesaj.icerik.toLowerCase().includes('https') || mesaj.icerik.toLowerCase().includes('http') || mesaj.icerik.toLowerCase().includes('.com')) {
            message.delete({ timeout: 5000 })
            return message.channel.send(hembed.setDescription(`Son silinen mesajda reklam bulunmakta!`)).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        }
        let mesajYazari = await message.guild.members.cache.get(mesaj.yazar);
        if (mesaj.icerik) {
            return message.channel.send(embed.setDescription(`
        Mesaj sahibi: ${mesajYazari ? mesajYazari : mesajYazari.tag} ( \`${mesajYazari.id}\` )
        Mesajın silinme tarihi: \`${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")}\` önce 
        
        Silinen Mesaj: \`${mesaj.dosya ? "Atılan mesaj bir dosya içeriyor." : mesaj.icerik}\`
        `).setFooter(`Developed by Matthe`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        }
    }
}