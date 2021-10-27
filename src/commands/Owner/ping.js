module.exports = {
    name: "ping",
    aliases: [],
    owner: true,
    execute: async(client, message) => {
        message.channel.send(`Anlık pingim: " ${client.ws.ping} ms"`).catch(err => console.log(err), client.ytick(message)).then(m => m.delete({timeout: 10000}));
    } 
}