const config = require("../../../config.json")
module.exports = {
    name: "ban-bilgi",
    aliases: ["bansor"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("BAN_MEMBERS") && message.member.roles.cache.has(config.penals.ban.staff)) return channel.error(message, "Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));

        let kullanici = args[0];

        if (!kullanici) return channel.error(message, "Öncelikle geçerli bir kullanıcı ID belirtmelisin!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));

        guild.fetchBans()

            .then(bans => {

                if (!bans.has(kullanici)) {

                    return channel.error(message, `Belirttiğiniz kullanıcı banlanmamış.`).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));

                }

            })

        guild.fetchBan(kullanici).then(({ user, reason }) => {

            channel.send(embed.setDescription(`${user.tag} kullanıcısının ban sebebi: **${reason}**`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));



        })

    }
}