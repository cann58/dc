module.exports = {
  name: "atla",
  description: "Matthe Müzik Botu",
  execute(client, message, args) {
    const { channel } = message.member.voice;

    if (!channel) {
      return message.channel.send("Öncelikle geçerli bir ses kanalına girmelisiniz!");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Öncelikle geçerli bir şarkı oynatılmalı!");
    }
    serverQueue.connection.dispatcher.end();
    message.channel.send("Belirttiğiniz şarkı başarıyla atlatıldı!");
  }
};