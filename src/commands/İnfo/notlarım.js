const db = require("quick.db");

module.exports = {
    name: "notlarım",
    aliases: [],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const notes = db.get(`notes_${author.id}`)
        if (!notes) return channel.send(embed.setDescription("Henüz hiç not almamışsın"))
        channel.send(embed.setDescription(`${notes.map((data, n) => `**${n + 1}.** ${data}`).join("\n")}`).setTitle("Kullanıcı notların"))
    }
}