module.exports = {
  name: "devam", 
  description: "Matthe Müzik Botu",
  execute (client, message, args) {
      const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("Öncelikle geçerli bir ses kanalına girmelisiniz!");
    }
    const serverQueue = message.client.queue.get(message.guild.id);
    if(!serverQueue) return message.channel.send('**Oynatılan bir şarkı Bulunmuyor.**')
    if(serverQueue.playing) return message.channel.send(`Duran bir şarkı yok.`)
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume(true)
  
  return message.channel.send("Duraklattığınız şarkı başarıyla devam ettirildi!") 
 } 
    
    message.channel.send("Öncelikle geçerli bir şarkı duraklatmalısınız!")
    
  }
}