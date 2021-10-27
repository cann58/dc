module.exports = {
    name: "allmove",
    aliases: ["allmove"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MOVE_MEMBERS")) return 
        if (!args[0]) return channel.error(message, "Öncelikle üyelerin taşınacağı geçerli bir kanal ID'si girmelisin!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (message.member.voice.channelID) {
            const channels = message.member.voice.channel;
            channels.members.forEach((x, index) => {
         const wait = require("util").promisify(setTimeout);
                x.voice.setChannel(args[0]);
            });
            channel.send(embed.setDescription(`\`${channels.name}\` kanalındaki tüm kullanıcılar \`${guild.channels.cache.get(args[0]).name}\` adlı kanala taşındı!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        } else {
            const channels = guild.channels.cache.get(args[0]);
            channels.members.forEach((x, index) => {
const wait = require("util").promisify(setTimeout);
                x.voice.setChannel(args[1]);
            });
            channel.send(embed.setDescription(`\`${channels.name}\` kanalındaki tüm kullanıcılar \`${guild.channels.cache.get(args[1]).name}\` adlı kanala taşındı!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        }
    }
}