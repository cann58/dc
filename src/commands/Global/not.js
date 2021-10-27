const db = require("quick.db");

module.exports = {
    name: "not",
    aliases: ["notal", "nottut"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const notes = args.join(" ")
        if (!notes) return channel.error(message, "Öncelikle geçerli bir not girip tekrar dene!").catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        db.push(`notes_${author.id}`, notes);
        channel.send(embed.setDescription(`Başarıyla ${notes} notunu not aldınız!`)).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}