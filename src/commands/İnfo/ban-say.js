module.exports = {
  name: "bansay",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    guild.fetchBans()
      .then(bans => channel.send(embed.setDescription(`Sunucuda **${bans.size}** banlanmış kullanıcı bulunmakta!`)))
      .catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
  }
}