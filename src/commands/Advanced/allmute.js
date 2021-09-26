module.exports = {
    name: "allmute",
    aliases: ["sustur"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("MOVE_MEMBERS")) return;
        let channels = guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channels) return channel.error(message, "Öncelikle geçerli bir kanal ID girmeli ya da bir sesli kanalda bulunmalısın!");
        channels.members.filter((x) => !x.hasPermission("ADMINISTRATOR"))
          .forEach((x, index) => {
            client.wait(index * 1000);
            x.voice.setMute(true);
          });
        channel.send(embed.setDescription(`\`${channels.name}\` kanalındaki tüm üyeler susturuldu!`));
    }
}