const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "kiss",
    category: "user",
    description: "Kiss Tagged User",
    usage: ";kiss @user",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
        var kissGifss = [
            'https://media2.giphy.com/media/G3va31oEEnIkM/giphy.gif',
            'https://media1.tenor.com/images/f5167c56b1cca2814f9eca99c4f4fab8/tenor.gif?itemid=6155657',
            'https://media.tenor.com/images/fbb2b4d5c673ffcf8ec35e4652084c2a/tenor.gif',
            'https://media.giphy.com/media/ZRSGWtBJG4Tza/giphy.gif',
            'https://media.giphy.com/media/oHZPerDaubltu/giphy.gif',
            'https://acegif.com/wp-content/uploads/anime-kiss-m.gif',
            'https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif',
            'https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif',
            'https://media0.giphy.com/media/KH1CTZtw1iP3W/source.gif'
        ];
        let random = Math.floor(Math.random()* kissGifss.length);
        let gifs = kissGifss[random];
        let option = Math.floor((Math.random() * 10) + 1)
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | Kiss`)
            .addField(`Usage: ';kiss [user]'`,"Kiss Tagged User")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
            
             return message.channel.send(EmbedYes).then(msg =>{
                msg.delete({timeout:7000})
                message.delete({timeout: 7000})
             });
        }

        if(option > 5){
          
            let embed1 = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} just kissed ${args[0].charAt(0).toUpperCase() + args[0].slice(1)}❤️❤️`)
            .setThumbnail(gifs.toString())
           message.channel.send(embed1);
        }
        else{
            let embed2 = new Discord.MessageEmbed()
            .setDescription(`${message.author.username} just tried to kiss ${args[0].charAt(0).toUpperCase() + args[0].slice(1)} 🤮🤮🤮`)
           message.channel.send(embed2);
        }
    }
}