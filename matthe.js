const { Client, MessageEmbed, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const { readdir } = require("fs");
const config = require("./config.json");
const db = require("quick.db");
const moment = require('moment');
const ms = require("ms");
require("moment-duration-format");
const buttons = require('discord-buttons');
buttons(client)
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];

require("./src/helpers/function")(client);

readdir("./src/commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let prop = require(`./src/commands/${f}/` + file);
                console.log(`[MATTHE-COMMAND] ${prop.name} loaded!`);
                commands.set(prop.name, prop);
                prop.aliases.forEach(alias => {
                    aliases.set(alias, prop.name);
                });
            });
        });
    });
});

readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop)
        console.log(`[MATTHE-EVENT] ${prop.conf.name} loaded!`);
    });
});

client.on("message", async message => {
    if (message.content === "!buttons-role" && message.author.id === config.bot.owner) {
        const Giveaway = new buttons.MessageButton()
            .setStyle("red")
            .setLabel("Çekiliş Katılımcısı")
            .setID("Giveaway");
        const Activity = new buttons.MessageButton()
            .setStyle("green")
            .setLabel("Etkinlik Katılımcısı")
            .setID("Activity");

        message.channel.send(`${config.emojis.hello} **Merhaba!** \n\n Rollerimizi alarak sunucumuzda bir sürü şeyden **haberdar olabilirsiniz.**\n\n Aşağıda bulunan butonlardan rollerinizi alarak **Çekilişlerimizden, ve Etkinliklerimizden** faydalanabilirsiniz.\n\n \`NOT:\` Hepiniz bu kanalı görebilmektesiniz. Bu sunucumuzda everyone here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.`,
            {
                buttons: [Giveaway, Activity]
            });
    }

    if (message.content === "!buttons-info" && message.author.id === config.bot.owner) {

        const one = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("1")
            .setID("one");

        const two = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("2")
            .setID("two");

        const three = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("3")
            .setID("three");

        const four = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("4")
            .setID("four");

        const five = new buttons.MessageButton()
            .setStyle("gray")
            .setLabel("5")
            .setID("five");
        message.channel.send("**Merhaba!** \n\n Aşşağıdaki butonlarla etkileşime girerek **sunucumuzdaki durumunuz hakkında bilgi edinebilirsiniz.** \n\n **1 -** `Sunucumuza daha önceden hangi isimlerle kayıt olduğunuzu kontrol edersiniz.` \n **2 -** `Sunucumuza daha önceden kayıt olup olmadığınızı kontrol edersiniz.` \n **3 -** `Sunucumuzda daha önceden ceza alıp almadığınızı kontrol edersiniz.` \n **4 -** `Sunucumuzdaki rollerinizi kontrol edersiniz.` \n **5 -** `Sunucumuza ne zaman katıldığınızı kontrol edersiniz.` \n\n Matthe iyi eğlenceler diler :)", { buttons: [one, two, three, four, five] })
    }
});

client.login(process.env.token).then(x => console.log(`Bot ${client.user.username} olarak giriş yaptı`)).catch(err => console.log(`Bot Giriş yapamadı sebep: ${err}`));

