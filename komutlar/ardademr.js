const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
	
        function rasteleSembol(uzunluk, semboller) {
   // ArdaDemr Youtube Kanalına ait vp generator altyapısı
    var maske = '';
    
    
    if (semboller.indexOf('A') > -1) maske += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    if (semboller.indexOf('0') > -1) maske += '0123456789';
    
    
    var sonuc = '';
    
     
    
    for (var i = uzunluk; i > 0; --i) 
    
    {
    
    sonuc += maske[Math.floor(Math.random() * maske.length)];
    
    }
    
    return sonuc;
   // ArdaDemr Youtube Kanalına ait vp generator altyapısı
}
setInterval (function () {
message.channel.send("REP-TR-"+ rasteleSembol(4,'0')+"–" + rasteleSembol(16,'0A'));
}, 1 * 3000); 
}

exports.conf = {
  aliases: []
};

exports.help = {
  name : "deneme"
};