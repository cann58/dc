module.exports = {
  name: "sıra",
  description: "Matthe Müzik Botu",
  execute: (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel) {
      return message.channel.send("Öncelikle geçerli bir ses kanalına girmelisiniz!");
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      return message.channel.send("Sırada şarkı bulunmamakta!");
    } 

    message.channel.send(
      `${serverQueue.songs
        .map((song, index) => index + 1 + ". " + song.title)
        .join("\n\n")}`,
      { split: true }
    );
  }
};