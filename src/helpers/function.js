const client = global.client;
const { TextChannel, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const ms = require("ms");

module.exports = async client => {

    client.fetchUser = async (userID) => {
        try {
            return await client.users.fetch(userID);
        } catch (err) {
            return undefined;
        }
    };

    TextChannel.prototype.error = async function (message, text) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
            .setFooter("Jahky. 🖤 Matthe");
        this.send(embed.setDescription(text)).then(x => { if (x.deletable) x.delete({ timeout: 10000 }) });
    }

    client.tick = async function (message) {
        if (config.emojis.mark) {
            message.react(config.emojis.mark);
        }
    }

    client.ytick = async function (message) {
        if (config.emojis.cross) {
            message.react(config.emojis.cross);
        }
    }
}