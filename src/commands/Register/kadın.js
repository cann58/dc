const db = require("quick.db");
const config = require("../../../config.json");
const moment = require("moment");

module.exports = {
    name: "kadın",
    aliases: ["k", "woman"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1];
        var age = args[2];
        const names = db.get(`isimler_${member.id}`)
        if (!message.member.roles.cache.has(config.registration.staff) && !message.member.hasPermission("ADMINISTRATOR")) return channel.send(embed.setDescription("Komutu kullanabilmek için geçerli yetkin olmalı"));
        if (!member) return channel.send(embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!name) return channel.send(embed.setDescription("Öncelikle geçerli bir isim belirtmelisin!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (!age) return channel.send(embed.setDescription("Öncelikle geçerli bir yaş belirtmelisin!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (isNaN(age)) return channel.send(embed.setDescription("Öncelikle yaş geçerli rakamlardan oluşsun!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (age < config.registration.minage) return channel.send(embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        if (config.registration.purchase) {
            if (!member.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole && config.roles.team)) {
                return message.channel.send(embed.setDescription(`Kullanıcının kayıt olabilmesi için boost basmalı veya tag almalı! (${config.registration.TagSymbol})`))
            }
        }
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.onewoman}>)`);
        db.add(`kadın_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
        db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.onewoman}>)`)
        await guild.members.cache.get(member.id).roles.add(config.registration.woman);
        await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        if (!names) {
            message.channel.send(embed.setDescription(`${member} kullanıcısı başarıyla <@&${config.registration.onewoman}> rolleri verilerek kayıt edildi!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        } else {
            channel.send(embed.setDescription(`${member} kullanıcısı başarıyla <@&${config.registration.onewoman}> olarak kayıt edildi!\n\nKullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
        }
        message.react(config.emojis.yes)
        client.channels.cache.get(config.channels.chat).send(`${member} aramıza katıldı!`);
    }
}