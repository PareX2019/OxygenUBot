const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "8ball",
    category: "user",
    description: "Returns An 8ball Output to the clients question",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | ${this.name}`)
            .addField(`Usage: ';${this.name} [question]'`,`${this.description}`)
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
            
             message.channel.send(EmbedYes);
        return;
        }
        else
        {
         if(!args[2]) return message.reply("Please Ask  An Actual Question!");
         let replies = ["No.","Yes.","Not Sure.","Maybe Not","Maybe","Possibly","Hell To The Yes","Hell Yeah","I dont know, All I Know Is That Oxygen U Winning.","Ask Again Later To Lazy Rn","As I see it, yes.","Better not tell you now.","Cannot predict now.","Concentrate and ask again.",
        "Dont count on it.","It is certan","It is decidely so."];
        let result = Math.floor((Math.random() * replies.length))
        let question = args.slice(1).join(" ")

        let eightBall = new Discord.MessageEmbed()
        .setColor('#082fba')
        .setTitle("Oxygen U | 8ball",'https://cdn.discordapp.com/attachments/747459208563130380/751377921914044476/11-111130_magic-eight-ball-magic-8-ball-hd-png.png')
        .addField("Question",question)
        .addField("Answer",replies[result])
        .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
        
        message.channel.send(eightBall);
        }
    }
}