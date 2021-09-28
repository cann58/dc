const config = require("../../../config.json");
module.exports = {
    name: "tarama",
    aliases: ["t"],
    guildowner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        const tag = config.registration.GuilDTag
        const tag2 = config.registration.GuilDTag2
        const memberss = guild.members.cache.filter(member => member.user.username.includes(tag));
        const membersss = guild.members.cache.filter(member => member.user.username.includes(tag2));
        memberss.map(member => member.roles.add(config.roles.team))
        channel.send(embed.setDescription(`${memberss.size} kullanıcıya taglı rolü verildi!`))
    }
}