const db = require("quick.db");
const config = require("../../../config.json");
const moment = require("moment");
moment.locale("tr")

module.exports = {
    name: "ekip",
    aliases: ["team"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (config.Guild.GuildOwnerRole.some(x => message.member.roles.cache.has(x)) || author.id !== config.bot.owner) return
        let crews = db.get(`crews.${guild.id}`) || [];
        let crewPage = crews.length > 0 ? crews.map((value) => `
        Ekip Adı: \`${value.EkipAdı}\`
        Ekip Tagları: (\`${value.EkipAdı}\` - \`${value.Sayısı}\`)
        Ekip Yöneticisi: <@!${value.Yöneticisi}>
        Katılım Tarihi: \`${moment(Date.now()).format("LLL")}\`
        Ekip Rolü: <@&${value.EkipRolu}>
        `).join("\n") : `Sunucumuzda ekip bulunmuyor.`;

        let secim = args[0];
        if (!secim) return channel.send(embed.setDescription(`
        **ekip** \`-\` Yardım menüsünü gösterir.
        **ekip ekle** \`-\` Yeni bir ekip eklersiniz.
        **ekip liste** \`-\` Ekipleri listelersiniz.
        **ekip bilgi** \`-\` Ekip bilgileri.
        **ekip kontrol** \`-\` Ekip kontrol.
        **ekip sil** \`-\` Mevcut bir ekibi silersiniz.
        `))
        let tag = args[1];
        let sayitagi = args[2];
        let yönetici = message.mentions.members.first() || guild.members.cache.get(args[3]);

        if (secim === "ekle") {
            if (!tag) return channel.send(embed.setDescription(`Geçerli bir tag belirtmelisin. (kullanım; \`ekip ekle tag sayıtagı yönetici\`!)`))
            if (!sayitagi || isNaN(sayitagi)) return channel.send(embed.setDescription(`Geçerli bir sayı tagı belirtmelisin.`))
            if (!yönetici) return channel.send(embed.setDescription(`Ekibin yöneticisini etiketlemelisin. (kullanım; \`ekip ekle tag sayıtagı yönetici\`!)`))

            guild.roles.create({
                data: {
                    name: `${tag} #${sayitagi}`,
                    color: "RANDOM",
                    mentionable: false,
                },
                reason: "Ekip Rolü Kuruldu!"
            }).then(role => {
                db.push(`crews.${guild.id}`, { EkipAdı: tag, Sayısı: sayitagi || "Yok!", Yöneticisi: yönetici.id, KatılmaTarihi: Date.now(), EkipRolu: role.id })
                db.set(`ekipler.${tag}.${guild.id}`, { EkipAdı: tag, Sayısı: sayitagi || "Yok!", Yöneticisi: yönetici.id, KatılmaTarihi: Date.now(), EkipRolu: role.id })
                channel.send(embed.setDescription(`
        **${tag}** adında bir ekip oluşturuldu!
        
        **Detaylı bilgiler:**
        \`Ekip Tagı:\` ${tag}
        \`Ekip Tagı(Sayı):\` ${sayitagi}
        \`Ekip Yöneticisi:\` ${yönetici}
        \`Ekibin sunucuya katılma tarihi:\` ${moment(Date.now()).format("LLL")}
        \`Ekip Rolü:\` <@&${role.id}>
        
        **Ekip Tagındaki Kişi Sayısı:**
        \`Yazılı(${tag}):\` ${guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size}
        \`Sayı(${sayitagi}):\` ${guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size}
        
        Toplamda ${guild.members.cache.filter(m => m.user.discriminator.includes(sayitagi)).size + guild.members.cache.filter(m => m.user.username.toLowerCase().includes(tag)).size} kişiye <@&${role.id}> rolü dağıtılıyor!
        `))
                guild.members.cache.forEach(qwe => {
                    if (qwe.user.username.includes(tag)) {
                        qwe.roles.add(role.id)
                    }
                })
                guild.members.cache.forEach(qwe => {
                    if (qwe.user.discriminator.includes(sayitagi)) {
                        qwe.roles.add(role.id)
                    }
                })

            })
        }

        if (secim === "liste") {
            channel.send(embed.setDescription(`
        Sunucumuzda Toplam \`${crews.length || "0"}\` adet ekip var!
        
        ${crewPage}
        `))
        }

        if (secim === "bilgi") {
            if (!tag) return channel.send(embed.setDescription("Bir tag belirtmelisin."))
            let ekipler = db.fetch(`ekipler.${tag}.${guild.id}`)
            if (!ekipler) return channel.send(embed.setDescription("Geçerli bir ekip belirtmelisin."))
            channel.send(embed.setDescription(`
        **${ekipler.EkipAdı}** ekibinin bilgileri gösteriliyor!
        
        \`Ekip Tagı:\` ${ekipler.EkipAdı}
        \`Sayı Tagı:\` ${ekipler.Sayısı}
        \`Yöneticisi:\` ${guild.members.cache.get(ekipler.Yöneticisi) || guild.members.cache.get(ekipler.Yöneticisi).user.tag}
        \`Katılım Tarihi:\` \`${moment(ekipler.KatılmaTarihi).format("LLL")}\`
        \`Ekibin Rolü:\` <@&${ekipler.EkipRolu}>
        `))
        }

        if (secim === "kontrol") {
            if (!tag) return channel.send(embed.setDescription("Bir tag belirtmelisin."))
            let ekipler = db.fetch(`ekipler.${tag}.${guild.id}`)
            if (!ekipler) return channel.send(embed.setDescription("Geçerli bir ekip belirtmelisin."))
            channel.send(embed.setDescription(`
        **${ekipler.EkipAdı}** kontrol ediliyor..
        Yöneticisi: ${guild.members.cache.get(ekipler.Yöneticisi) || guild.members.cache.get(ekipler.Yöneticisi).user.tag}
        Yönetici: ${guild.members.cache.get(ekipler.Yöneticisi).voice.channelID ? "Ekip yöneticisi seste!" : "Ekip yöneticisi seste değil!"}
        \`Seste Olan Kişi Sayısı(Yazılı Tag):\` ${guild.members.cache.filter(s => s.user.username.toLowerCase().includes(ekipler.EkipAdı)).filter(s => s.voice.channel).size || "0"}
        \`Seste Olan Kişi Sayısı(Sayılı Tag):\` ${guild.members.cache.filter(s => s.user.discriminator.includes(ekipler.Sayısı)).filter(s => s.voice.channel).size || "0"}
        \`Seste Olan Kişi Sayısı(Toplam):\` ${guild.members.cache.filter(s => s.user.discriminator.includes(ekipler.Sayısı)).filter(s => s.voice.channel).size + guild.members.cache.filter(s => s.user.username.includes(ekipler.EkipAdı)).filter(s => s.voice.channel).size || 0}
        `))
        }

        if (secim === "sil") {
            if (!tag) return channel.send(embed.setDescription("Bir tag belirtmelisin."))
            let ekipler = db.fetch(`ekipler.${tag}.${guild.id}`)
            if (!ekipler) return channel.send(embed.setDescription("Geçerli bir ekip belirtmelisin."))
            channel.send(embed.setDescription(`
        **${ekipler.EkipAdı}** isimli ekip silindi.
        
        **${guild.roles.cache.get(ekipler.EkipRolu).name || "Silinen Rol"}** isimli rol silindi.
        
        ${guild.members.cache.get(ekipler.Yöneticisi) || "Ekip Yöneticisine"} ekibinin sunucumuzdan ayrıldığı bildirildi.
        `))
            guild.members.cache.get(ekipler.Yöneticisi).send(embed.setDescription(`
        **${ekipler.EkipAdı}** isimli ekibin **${guild.name}** isimli sunucudan ayrıldı!
        `))
            guild.roles.cache.get(ekipler.EkipRolu).delete({ reason: "Ekip Ayrıldı!" });
            db.delete(`ekipler.${tag}.${guild.id}`)
        }
    }
}