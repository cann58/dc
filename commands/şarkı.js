module.exports = {
  name: "şarkı",
  description: "Matthe Müzik Botu",
  execute (client, message, args) {
    
      const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("Öncelikle geçerli bir ses kanalına girmelisiniz!");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Şuanda herhangi bir şarkı oynatılmıyor!");
    }
    message.channel.send(serverQueue.songs[0].title + ' - Şuanda oynatılan şarkı:')

    
    
    
  }
}