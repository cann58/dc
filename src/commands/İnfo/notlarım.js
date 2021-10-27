const db = require("quick.db");

module.exports = {
    name: "notlarım",
    aliases: ["notlarım", "notlarim"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        const notes = db.get(`notes_${author.id}`)
        if (!notes) return channel.send(embed.setDescription("Veri tabanında not verin bulunmamakta!")).catch(err => console.log(err), client.tick(message)).then(m => m.delete({timeout: 10000}));
        channel.send(embed.setDescription(`${notes.map((data, n) => `**${n + 1}.** ${data}`).join("\n")}`).setTitle("Kullanıcının veri tabanındaki notları:")).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    }
}