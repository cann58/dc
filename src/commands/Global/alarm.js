const Discord = require('discord.js');
const ms = require('ms');
const config = require("../../../config.json")
const prefix = config.bot.prefix
module.exports = {
    name: "alarm",
    aliases: ["hatırlatıcı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let time = args[0]
        if (!time) return channel.error(message, `${prefix}alarm <1h,1m,1s> <hatırlatacağım şey>`).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        let alarm = args.slice(1).join(' ')
        if (!alarm) return channel.error(message, `${prefix}alarm <1h,1m,1s> <hatırlatacağım şey>`).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        channel.send(`Alarm kuruldu **${time}** sonra size bildireceğim!`)
        setTimeout(() => {
            author.send(`${author}, Hatırlatmamı istediğin şeyin zamanı geldi!\n**${alarm}**`).catch(err => channel.send(`${author}, Hatırlatmamı istediğin şeyin zamanı geldi!\n**${alarm}**`))
        }, ms(time));
    }
}