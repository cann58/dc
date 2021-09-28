const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["count", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var TotalMember = message.guild.memberCount
        var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
        var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        var Etiket = message.guild.members.cache.filter(u => u.user.discriminator.includes(config.registration.GuildDiscrim)).size;
        var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
        var Boost = message.guild.premiumSubscriptionCount;

        message.channel.send(new MessageEmbed().setFooter("Developed by Matthe").setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`
    \`•\` Sunucumuzda toplam **${TotalMember}** kullanıcı bulunmaktadır.
    \`•\` Sunucumuzda toplam **${Online}** aktif kullanıcı bulunmaktadır.
    \`•\` Seste **${Voice}** kullanıcı bulunmaktadır.
    
    \`•\` Toplam **${Taglı}** \`${config.registration.GuilDTag}\` kişi tagımızda bulunuyor.
    \`•\` Toplam **${Etiket}** \`#${config.registration.GuildDiscrim}\` kişi etiket tagımızda bulunuyor.
    `))
      
    }
}