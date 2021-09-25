const db = require("quick.db");

module.exports = {
    name: "not",
    aliases: ["notal", "nottut"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const notes = args.join(" ")
        if (!notes) return channel.error(message, "Lütfen bir not girip tekrar dene");
        db.push(`notes_${author.id}`, notes);
        channel.send(embed.setDescription(`Başarıyla ${notes} notunu not aldınız`))
    }
}