const config = require("../../../config.json");
const db = require("quick.db")

module.exports = {
    name: "yasaklıtag",
    aliases: ["ytag"],
    guildowner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {

        if (args[0] === "ekle") {
            let data = await db.get(`bannedtag_${guild.id}`) || []
            let hedeftag = args[1]
            if (!hedeftag) return channel.send(embed.setDescription(`${author}, Bir tag belirtin.`))
            if (data.includes(hedeftag)) return channel.send(embed.setDescription(`Bu tag zaten yasaklı listede bulunmakta.`))
            db.push(`bannedtag_${guild.id}`, hedeftag)
            const memberss = guild.members.cache.filter(member => member.user.username.includes(hedeftag))
            channel.send(embed.setDescription(`\`${hedeftag}\` Tagı yasaklı taglar listesine eklendi. Bu tagdaki üye sayısı **${memberss.size}**`))
        }
        if (args[0] === "liste") {
            let data = await db.get(`bannedtag_${guild.id}`) || []
            channel.send(embed.setDescription(`**Yasaklı tag listesi;**\n\`${data.join('\n') || 'Bulunamadı.'} \``))
        }
        if (args[0] === "kaldır") {
            let data = await db.get(`bannedtag_${guild.id}`) || []
            let hedeftag = args[1]
            if (!hedeftag) return channel.send(embed.setDescription(`${author}, Bir tag belirtin.`))
            if (!data.includes(hedeftag)) return channel.send(embed.setDescription(`Bu tag zaten yasaklı listede bulunmamakta.`))
            db.set(`bannedtag_${guild.id}`, data.filter(x => x !== hedeftag))
            channel.send(embed.setDescription(`\`${hedeftag}\` Tagı yasaklı tag listesinden başarıyla kaldırıldı.`))
        }
        if (!args[0]) {
            channel.send(embed.setDescription(`${author}, Hatalı kullanım Örnek \`.yasaklıtag ekle/kaldır/liste\``))
        }
    }
}