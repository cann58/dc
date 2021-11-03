const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    name: "tag-tara",
    aliases: ["tagtara", "tt"],
    execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.Guild.GuildOwnerRole) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    new MessageEmbed().setColor(message.member.displayHexColor).setTimestamp().setFooter("Developed by Matthe").setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
    let rol = config.roles.team
    let tag = config.registration.GuilDTag
    message.guild.members.cache.filter(s => s.user.discriminator === s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    channel.send(embed.setDescription(`
Kullanıcı adında \`${tag}\` bulunduran kullanıcılara taglı rolü veriliyor!
`))

    }
}