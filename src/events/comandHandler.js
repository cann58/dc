const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require('ms');

const iltifatlar = [
    'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
    'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
    'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
    'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
    'Etkili gülüş kavramını ben senden öğrendim.',
    'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
    'Gözlerinle baharı getirdin garip gönlüme.',
    'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
    'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
    'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
    'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
    'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
    'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
    'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
    'Biraz Çevrendeki İnsanları Takarmısın ?',
    'İğrenç İnsansın!',
    'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
    'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Mucizelerden bahsediyordum.',
    "Yaşanılacak en güzel mevsim sensin.",
    "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
    "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
    "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
    "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
    "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
    "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
    "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
    "Bir gamzen var sanki cennette bir çukur.",
    "Gecemi aydınlatan yıldızımsın.",
    "Ponçik burnundan ısırırım seni",
    "Bu dünyanın 8. harikası olma ihtimalin?",
    "fıstık naber?",
    "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
    "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
    "Müsaitsen aklım bu gece sende kalacak.",
    "Gemim olsa ne yazar liman sen olmadıktan sonra...",
    "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
    "Sabahları görmek istediğim ilk şey sensin.",
    "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
    "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
    "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
    "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
    "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
    "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
    "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
    "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
    "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
    "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
    "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
    "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
    "Dur beynimi çıkarayım, eşit şartlarda konuşalım",
    "Azrail bile ayağıma geliyor ne bu tripler?",
    "Sevgilim var yazma?",
    "Halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
    "O kadar pubg oynadım böyle vurulmadım"
];
var iltifatSayi = 0;

module.exports = async (message) => {
    if (!message.guild || message.author.bot) return
    if ([".tag", "!tag", "tag", "TAG"].some(x => message.content === x)) {
        message.channel.send(`\`${config.registration.GuilDTag}\`, \`${config.registration.EtiketTag}\` `)
    }
    if (message.channel.id === config.channels.chat) {
        iltifatSayi++
        if (iltifatSayi >= config.bot.iltifatsize) {
            iltifatSayi = 0;
            message.reply(`**${(iltifatlar)[Math.floor(Math.random() * ((iltifatlar).length - 1) + 1)]}**`);
        }
    }
    const afkembed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter((config.bot.footer), message.guild.iconURL())
        .setTimestamp()
    const etiket = message.mentions.users.first()
    const uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    const nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if (etiket) {
        const reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
        const uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
        if (message.content.includes(uye2)) {
            const time = db.fetch(`afktime_${message.guild.id}`);
            const timeObj = ms(Date.now() - time);
            message.channel.send(afkembed.setDescription(`${etiket} adlı kullanıcı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`).setColor("#2F3136"))
        }
    }
    if (message.author.id === uye) {
        message.member.setNickname(nickk).catch(err => console.log(" "))
        db.deconste(`sebep_${message.author.id}_${message.guild.id}`)
        db.deconste(`user_${message.author.id}_${message.guild.id}`)
        db.deconste(`nick_${message.author.id}_${message.guild.id}`)
        db.deconste(`user_${message.author.id}_${message.guild.id}`);
        db.deconste(`afktime_${message.guild.id}`)
        message.channel.send(afkembed.setDescription(`Başarıyla \`AFK\` modundan çıkış yaptınız!`))
    }
    if (!message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const owner = client.users.cache.get("796263552771817472");
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter("Developed by Matthe", owner.avatarURL({ dynamic: true }))
    if (cmd) {
        if (cmd.owner && config.bot.owner !== author.id) return
        if (cmd.guildowner && config.bot.owner !== author.id && guild.owner.id !== author.id) return
        if (client.cooldown.has(author.id) === config.bot.cooldown) {
            client.commandblocked.push(author.id)
            channel.send(embed.setDescription(`${author} Komutları kötüye kullandığın için engellendin! Açtırmak için \`${owner.tag}\` ulaşarak açtırabilirsin.`))
        }
        if (client.commandblocked.includes(message.author.id)) return
        cmd.execute(client, message, args, embed, author, channel, guild);
        if (config.bot.owner !== author.id && guild.owner.id !== author.id) {
            if (!client.cooldown.has(author.id)) client.cooldown.set(author.id, 1);
            else client.cooldown.set(author.id, client.cooldown.get(author.id) + 1);
        }
        setTimeout(() => {
            if (client.cooldown.has(author.id)) {
                client.cooldown.delete(author.id)
            }
        }, 1000 * 60 * 5);
    }
}

module.exports.conf = {
    name: "message"
}