const config = require("../../../config.json");
const db = require("quick.db");

module.exports = {
  name: "zengin",
  aliases: ["booster"],
  execute: async (client, message, args, embed, author, channel, guild) => {
    if (!message.member.roles.cache.has(config.roles.boosterrole)) return channel.error(message, "Bu komutu kullanabilmek için öncelikle booster olman gerek!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    let name = args.slice(0).join(' ');
    if (!name) return channel.error(message, `Öncelikle geçerli bir kullanıcı adı giriniz!`).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    if (name.length > 32) return channel.error(message, `Öncelikle **32** karakteri geçmeyen bir isim belirtiniz!`).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
    guild.members.cache.get(author.id).setNickname(name).then(x => channel.send(embed.setDescription(`Kullanıcı adın başarıyla **${name}** olarak değiştirildi!`), client.tick(message)), db.push(`isimler_`, (`${name} (Booster)`))).catch(err => console.log(err), client.ytick(message))
  }
}