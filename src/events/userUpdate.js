const Discord = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");
const {MessageEmbed} = require("discord.js");
const client = global.client;


module.exports = async function(oldUser, newUser) {
    const guild = client.guilds.cache.get(config.Guild.GuildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === config.roles.team)
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed().setTimestamp().setFooter(`Developed by Matthe`)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(config.registration.GuilDTag) && !newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.remove(config.roles.team)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} isminden \`${config.registration.GuilDTag}\` çıkartarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(config.registration.GuilDTag) && newUser.username.includes(config.registration.GuilDTag)) {
            member.roles.add(config.roles.team)
            client.channels.cache.get(config.channels.chat).send(`Tebrikler, ${newUser} \`${config.registration.GuilDTag}\` tag alarak ailemize katıldı!`)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} ismine \`${config.registration.GuilDTag}\` alarak ailemize katıldı`))
        }
    }
  
    if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == config.registration.GuildDiscrim && newUser.discriminator !== config.registration.GuildDiscrim) {
            member.roles.remove(role)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} etiket tagımızı çıkartarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== config.registration.GuildDiscrim && newUser.discriminator == config.registration.GuildDiscrim) {
            member.roles.add(role)
            client.channels.cache.get(config.logs.taglog).send(embed.setDescription(`${newUser} etiketine tagımızı alarak ailemize katıldı!`))
            client.channels.cache.get(config.channels.chat).send(`Tebrikler, ${newUser} etiket tagımızı alarak ailemize katıldı! `)
        }
    }
}

client.on("userUpdate", async (oldUser, newUser) => {
if (oldUser.username !== newUser.username) {
let tag = (config.registration.GuilDTag) ///////tag girin
let sunucu = (config.registration.GuilDTag)///////sunucunuzun id
let kanal = (config.registration.GuilDTag) ///////log tutulcak kanal id
let rol = (config.registration.GuilDTag)/////tag aldımı verilmesini istediğiniz rol id
if (newUser.username.includes(tag) && !client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
client.channels.get(kanal).send(`**${newUser} adlı kişi ${tag} tagımızı aldığı için <@&${rol}> rolü verildi !**`)
client.guilds.get(sunucu).members.get(newUser.id).addRole(rol) }
if (!newUser.username.includes(tag) && client.guilds.get(sunucu).members.get(newUser.id).roles.has(rol)) {
client.guilds.get(sunucu).members.get(newUser.id).removeRole(rol)
client.channels.get(kanal).send(`**${newUser} adlı kişi ${tag} tagımızı çıkardığı için <@&${rol}> rolü alındı !**`) } } })

module.exports.conf = {
    name: "userUpdate"
}