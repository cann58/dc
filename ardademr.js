const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();

const fs = require("fs");
                              // ArdaDemr Youtube Kanalına ait owo sayaç bot
//Uptime için__________________________________________________________________
app.get("/", (req, res) => {
  res.send("ArdaDemr Discord Bot Altyapısı");
});
app.listen(process.env.PORT);

//KOMUT Algılayıcı______________________________________________________________
client.commands = new Discord.Collection();

fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    client.commands.set(cmd.help.name, cmd);
  });
});
// ArdaDemr Youtube Kanalına ait owo sayaç bot
//EVENTS Yükleyici_______________________________________________________________
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});

client.on("ready", () => {
  console.log(`ArdaDemr Discord Bot Altyapısı BOT AKTİF`);
});

client.login(process.env.TOKEN);
// ArdaDemr Youtube Kanalına ait owo sayaç bot


const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase("db");

client.on("message",message=>{
	if(message.author.bot) return false;
	if(message.content.startsWith("owo") || message.content.startsWith("w")){
		db.add(`toplam_owo_${message.author.id}`,1);
		db.add(`${message.guild.id}_owo_${message.author.id}`,1);
	}if(message.content.startsWith("owo curse") || message.content.startsWith("w curse") || message.content.startsWith("owocurse") || message.content.startsWith("wcurse")){
		db.add(`toplam_curse_${message.author.id}`,1);
		db.add(`${message.guild.id}_curse_${message.author.id}`,1);
	}else if(message.content.startsWith("owo pray") || message.content.startsWith("w pray") || message.content.startsWith("owopray") || message.content.startsWith("wpray")){
		db.add(`toplam_pray_${message.author.id}`,1);
		db.add(`${message.guild.id}_pray_${message.author.id}`,1);
	}else if(message.content.startsWith("owo cookie") || message.content.startsWith("w cookie") || message.content.startsWith("owocookie") || message.content.startsWith("wcookie")){
		db.add(`toplam_cookie_${message.author.id}`,1);
		db.add(`${message.guild.id}_cookie_${message.author.id}`,1);
	}else if(message.content.startsWith("owo h") || message.content.startsWith("w h") || message.content.startsWith("owoh") || message.content.startsWith("wh") || message.content.startsWith("owo hunt") || message.content.startsWith("w hunt") || message.content.startsWith("owohunt") || message.content.startsWith("whunt")){
		db.add(`toplam_h_${message.author.id}`,1);
		db.add(`${message.guild.id}_h_${message.author.id}`,1);
	}else if(message.content.startsWith("owo b") || message.content.startsWith("w b") || message.content.startsWith("owob") || message.content.startsWith("wb") || message.content.startsWith("owo battle") || message.content.startsWith("w battle") || message.content.startsWith("owobattle") || message.content.startsWith("wbattle")){
		db.add(`toplam_b_${message.author.id}`,1);
		db.add(`${message.guild.id}_b_${message.author.id}`,1);
	}else if(message.content.startsWith("owo cf") || message.content.startsWith("w cf") || message.content.startsWith("owocf") || message.content.startsWith("wcf") || message.content.startsWith("owo coinflip") || message.content.startsWith("w coinflip") || message.content.startsWith("owocoinflip") || message.content.startsWith("wcoinflip")){
		db.add(`toplam_cf_${message.author.id}`,1);
		db.add(`${message.guild.id}_cf_${message.author.id}`,1);
	}else if(message.content.startsWith("owo daily") || message.content.startsWith("w daily") || message.content.startsWith("owodaily") || message.content.startsWith("wdaily")){
		db.add(`toplam_daily_${message.author.id}`,1);
		db.add(`${message.guild.id}_daily_${message.author.id}`,1);
	}else if(message.content.startsWith("owo slots") || message.content.startsWith("w slots") || message.content.startsWith("owoslots") || message.content.startsWith("wslots")){
		db.add(`toplam_slots_${message.author.id}`,1);
		db.add(`${message.guild.id}_slots_${message.author.id}`,1);
	}else if(message.content.startsWith("owo blackjack") || message.content.startsWith("w blackjack") || message.content.startsWith("owoblackjack") || message.content.startsWith("wblackjack") || message.content.startsWith("owo bj") || message.content.startsWith("w bj") || message.content.startsWith("owobj") || message.content.startsWith("wcbj")){
		db.add(`toplam_bj_${message.author.id}`,1);
		db.add(`${message.guild.id}_bj_${message.author.id}`,1);
	}else if(message.content.startsWith("owo lottery") || message.content.startsWith("w lottery") || message.content.startsWith("owolottery") || message.content.startsWith("wlottery")){
		db.add(`toplam_lottery_${message.author.id}`,1);
		db.add(`${message.guild.id}_lottery_${message.author.id}`,1);
	}else if(message.content.startsWith("owo drop") || message.content.startsWith("w drop") || message.content.startsWith("owodrop") || message.content.startsWith("wdrop")){
		db.add(`toplam_drop_${message.author.id}`,1);
		db.add(`${message.guild.id}_drop_${message.author.id}`,1);
	}else if(message.content.startsWith("!owostats")){
		var kisi = message.author;
		if(message.mentions.users.first()) var kisi = message.mentions.users.first();

		if(message.mentions.users.first()){
			if(message.mentions.users.first().bot) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("Botlar owo kullanamaz ! "));
		}

		var toplam_owo = db.get(`toplam_owo_${kisi.id}`) || 0;
		var sunucu_owo = db.get(`${message.guild.id}_owo_${kisi.id}`) || 0;
		var toplam_curse = db.get(`toplam_curse_${kisi.id}`) || 0;
		var sunucu_curse = db.get(`${message.guild.id}_curse_${kisi.id}`) || 0;
		var toplam_pray = db.get(`toplam_pray_${kisi.id}`) || 0;
		var sunucu_pray = db.get(`${message.guild.id}_pray_${kisi.id}`) || 0;
		var toplam_cookie = db.get(`toplam_cookie_${kisi.id}`) || 0;
		var sunucu_cookie = db.get(`${message.guild.id}_cookie_${kisi.id}`) || 0;
		var toplam_h = db.get(`toplam_h_${kisi.id}`) || 0;
		var sunucu_h = db.get(`${message.guild.id}_h_${kisi.id}`) || 0;
		var toplam_b = db.get(`toplam_b_${kisi.id}`) || 0;
		var sunucu_b = db.get(`${message.guild.id}_b_${kisi.id}`) || 0;
		var toplam_cf = db.get(`toplam_cf_${kisi.id}`) || 0;
		var sunucu_cf = db.get(`${message.guild.id}_cf_${kisi.id}`) || 0;
		var toplam_daily = db.get(`toplam_daily${kisi.id}`) || 0;
		var sunucu_daily = db.get(`${message.guild.id}_daily_${kisi.id}`) || 0;
		var toplam_slots = db.get(`toplam_slots_${kisi.id}`) || 0;
		var sunucu_slots = db.get(`${message.guild.id}_slots_${kisi.id}`) || 0;
		var toplam_bj = db.get(`toplam_bj_${kisi.id}`) || 0;
		var sunucu_bj = db.get(`${message.guild.id}_bj_${kisi.id}`) || 0;
		var toplam_lottery = db.get(`toplam_lottery${kisi.id}`) || 0;
		var sunucu_lottery = db.get(`${message.guild.id}_lottery_${kisi.id}`) || 0;
		var toplam_drop = db.get(`toplam_drop${kisi.id}`) || 0;
		var sunucu_drop = db.get(`${message.guild.id}_drop_${kisi.id}`) || 0;

		if(!message.mentions.users.first() && message.content.split(" ")[1]){
			if(!db.get(`toplam_${message.content.split(" ")[1]}_${kisi.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("Böyle bir owo komutu yok veya sen hiç bu komudu kullanmamışsın ! "));
			message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**Toplam ${message.content.split(" ")[1]}** : ${db.get(`toplam_${message.content.split(" ")[1]}_${kisi.id}`)}
																							   **Sunucu ${message.content.split(" ")[1]}** : ${db.get(`${message.guild.id}_${message.content.split(" ")[1]}_${kisi.id}`)}`).setTitle(`${kisi.tag} owo ${message.content.split(" ")[1]} istatistikleri`))
			return false;
		}

		if(message.mentions.users.first() && message.content.split(" ")[2]){
			if(!db.get(`toplam_${message.content.split(" ")[2]}_${kisi.id}`)) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setTitle("Böyle bir owo komutu yok veya bu kişi hiç bu komudu kullanmamış ! "));
			message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**Toplam ${message.content.split(" ")[2]}** : ${db.get(`toplam_${message.content.split(" ")[2]}_${kisi.id}`)}
																							   **Sunucu ${message.content.split(" ")[2]}** : ${db.get(`${message.guild.id}_${message.content.split(" ")[2]}_${kisi.id}`)}`).setTitle(`${kisi.tag} owo ${message.content.split(" ")[2]} istatistikleri`))
			return false;
		}

		message.channel.send(new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle(`${kisi.tag} owo istatistikleri`)
			.setDescription(`**Toplam owo** : ${toplam_owo}
							 **Bu sunucuda owo** : ${sunucu_owo}

							 **Toplam curse** : ${toplam_curse}
							 **Sunucu curse** : ${sunucu_curse}

							 **Toplam pray** : ${toplam_pray}
							 **Sunucu pray** : ${sunucu_pray}

							 **Toplam cookie** : ${toplam_cookie}
							 **Sunucu cookie** : ${sunucu_cookie}

							 **Toplam hunt(h)** : ${toplam_h}
							 **Sunucu hunt(h)** : ${sunucu_h}

							 **Toplam battle(b)** : ${toplam_b}
							 **Sunucu battle(b)** : ${sunucu_b}

							 **Toplam coinflip(cf)** : ${toplam_cf}
							 **Sunucu coinflip(cf)** : ${sunucu_cf}

							 **Toplam daily** : ${toplam_daily}
							 **Sunucu daily** : ${sunucu_daily}

							 **Toplam slots** : ${toplam_slots}
							 **Sunucu slots** : ${sunucu_slots}

							 **Toplam blackjack(bj)** : ${toplam_bj}
							 **Sunucu blackjack(bj)** : ${sunucu_bj}

							 **Toplam lottery** : ${toplam_lottery}
							 **Sunucu lottery** : ${sunucu_lottery}

							 **Toplam drop** : ${toplam_drop}
							 **Sunucu drop** : ${sunucu_drop}`))
	};
});