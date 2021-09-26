const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "rollog",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    const member = message.mentions.users.first() || guild.members.cache.get(args[0]);
    if (!member) return channel.error(message, "Öncelikle rol geçmişine bakacağın kullanıcıyı belirtmelisin.");
    const role = db.get(`rolelog_${member.id}`);
    if (!role) return message.channel.send(embed.setDescription(`${member} kullanıcısının rol verisi bulunmamaktadır!`));
    message.channel.send(embed.setDescription(role.map((data) => `${data}`).join("\n")))
  }
}