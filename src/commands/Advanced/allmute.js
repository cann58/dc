module.exports = {
    name: "allmute",
    aliases: ["herkesi-sustur"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MOVE_MEMBERS")) return;
        let channels = guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channels) return channel.error(message, "Öncelikle geçerli bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        channels.members.filter((x) => !x.hasPermission("ADMINISTRATOR"))
          .forEach((x, index) => {
         const wait = require("util").promisify(setTimeout);
            x.voice.setMute(true);
          });
        channel.send(embed.setDescription(`\`${channels.name}\` kanalındaki tüm üyeler susturuldu!`));
    }
}