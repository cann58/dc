const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "erkek",
    aliases: ["e", "boy", "man"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        const name = args[1]
        const age = args[2]
        const names = db.get(`isimler_${member.id}`)
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Ne yazık ki komutu kullanan kişide yetki yok"));
        if (!member) return channel.send(embed.setDescription("Lütfen bir kullanıcıyı etiketle."));
        if (!name) return channel.send(embed.setDescription("Lütfen kullanıcı için bir isim belirt."));
        if (!age) return channel.send(embed.setDescription("Lütfen kullanıcı için bir yaş belirt."));
        if (isNaN(age)) return channel.send(embed.setDescription("Lütfen belirttiğin yaş rakamlardan oluşsun"))
        if (age < config.registration.minage) return channel.send(embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!"))
        if (config.registration.purchase) {
            if (!member.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole)) {
                return channel.send(embed.setDescription(`Kullanıcının kayıt olabilmesi için boost basmalı veya tag almalı! (${config.registration.GuilDTag})`))
            }
        }
        await guild.members.cache.get(member.id).setNickname(`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}`);
        db.add(`erkek_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
        db.push(`isimler_${member.id}`, ` \`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.oneman}>)`);
        db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.oneman}>)`)
        await guild.members.cache.get(member.id).roles.add(config.registration.man);
        await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        if (!names) {
            channel.send(embed.setDescription(`\`❯\` ${member} kullanıcısı başarıyla \" Erkek \" olarak kayıt edildi.`))
        } else {
            channel.send(embed.setDescription(`\`❯\` ${member} adlı üye başarılı bir şekilde \" Erkek \" olarak kayıt edildi!\n\nKişinin toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`))
        }
        db.push(`isimler_${member.id}`, ` \`${config.registration.GuilDTag} ${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.oneman}>)`);
        client.channels.cache.get(config.channels.chat).send(`${member} Aramıza katıldı, ona **merhaba** diyelim`);
    }
}