const Discord = require("discord.js");
const config = require("../../../config.json")
const db = require("quick.db");

module.exports = {
  name: "sicil",
  aliases: [],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.penals.ban.staff) && !message.member.hasPermission("BAN_MEMBERS")) return channel.error(message, "Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")
    let member = message.mentions.members.first() || guild.members.cache.get(args[0]);
    const points = db.fetch(`points_${member.id}`) || 0
    if (!member) return channel.error(message, "Öncelikle siciline bakacağın kullanıcıyı belirtmelisin.")
    let penals = db.get(`sicil_${member.user.id}`);
    if (!penals) return channel.send(`${member} kullanıcısının sicil verisi bulunmamaktadır!`)
    channel.send(embed
      .setColor("RED")
      .setTitle(`Belirttiğiniz kullanıcının veri tabanındaki sicil verileri:`)
      .setFooter("Developed by Matthe")
      .setDescription(penals.map((data) => `${data}`).join("\n"))
      .addField("Toplam ceza puanı:", points))
  }
}