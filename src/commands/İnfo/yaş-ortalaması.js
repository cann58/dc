const config = require("../../../config.json");

module.exports = {
    name: "yaş-ortalaması",
    aliases: ["yaşortalaması", "yas-ortalamasi", "yasortalamasi"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!")).then(x => x.delete({timeout: 5000}));
        function ortalama(array) {
          if(array.length <= 0) return 0;
          const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
          return average(array).toFixed();
        };
        let members = message.guild.members.cache;
        let genel = members.filter(member => member.nickname && member.nickname.includes(config.registration.symbol) && !isNaN(member.nickname.split(config.registration.symbol )[1])).map(member => Number(member.nickname.split(config.registration.symbol )[1]));
        let erkek = members.filter(member => config.registration.man.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes(config.registration.symbol) && !isNaN(member.nickname.split(config.registration.symbol )[1] || "")).map(member => Number(member.nickname.split(config.registration.symbol )[1]));
        let kiz = members.filter(member => config.registration.woman.some(rol => member.roles.cache.has(rol)) && member.nickname && member.nickname.includes(config.registration.symbol) && !isNaN(member.nickname.split(config.registration.symbol )[1] || "")).map(member => Number(member.nickname.split(config.registration.symbol )[1]));
        let tagli = members.filter(member => member.roles.cache.has(config.roles.ekip) && member.nickname && member.nickname.includes(config.registration.symbol) && !isNaN(member.nickname.split(config.registration.symbol )[1] || "")).map(member => Number(member.nickname.split(config.registration.symbol )[1]));
        let ses = members.filter(member => member.voice.channel && member.nickname && member.nickname.includes(config.registration.symbol) && !isNaN(member.nickname.split(config.registration.symbol )[1] || "")).map(member => Number(member.nickname.split(config.registration.symbol )[1]));
        message.channel.send(embed.setDescription(`**Not:** Bu bilgiler manuel olarak ayarlanmamaktadır. Bot tarafından, sunucuda kayıtlı olan üyelerin yaş ortalamaları alınarak gösterilmektedir.`).addField('Anlık Sunucu Yaş Ortalamaları', `\`Genel:\` ${ortalama(genel)}\n\`Erkek:\` ${ortalama(erkek)}\n\`Kız:\` ${ortalama(kiz)}\n\`Taglı:\` ${ortalama(tagli)}\n\`Ses:\` ${ortalama(ses)}`).setThumbnail(guild.iconURL({dynamic: true, size: 2048})));
    }
}