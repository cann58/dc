module.exports = {
    name: "allmove",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MOVE_MEMBERS")) return 
        if (!args[0]) return channel.error(message, "Öncelikle üyelerin taşınacağı geçerli bir kanal ID'si girmelisin!");
        if (message.member.voice.channelID) {
            const channels = message.member.voice.channel;
            channels.members.forEach((x, index) => {
                client.wait(index * 1000);
                x.voice.setChannel(args[0]);
            });
            channel.send(embed.setDescription(`\`${channels.name}\` kanalındaki tüm üyeler \`${guild.channels.cache.get(args[0]).name}\` adlı kanala taşındı!`));
        } else {
            const channels = guild.channels.cache.get(args[0]);
            channels.members.forEach((x, index) => {
                client.wait(index * 1000);
                x.voice.setChannel(args[1]);
            });
            channel.send(embed.setDescription(`\`${channels.name}\` kanalındaki tüm üyeler \`${guild.channels.cache.get(args[1]).name}\` adlı kanala taşındı!`));
        }
    }
}