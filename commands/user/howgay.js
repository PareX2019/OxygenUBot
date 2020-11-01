const Discord = require('discord.js');

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}



module.exports = {
    name: "howgay",
    category: "user",
    description: "Returns howgay",
    usage: ";howgay @user[optional]",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
       let numba = Math.floor((Math.random() * 100) + 1);
       let Opinion = " straight asf 😳";
       if(numba >50){
           Opinion = " gay asf 😳";
       }
       if(!args[0]){
        let embeda =new Discord.MessageEmbed()
        .setTitle("Gay r8 Machine")
        .setColor('RANDOM')
        .addField("Result:",`Your ${numba}% Gay!`)
        .addField("Bots Opinion On You!", Opinion)
        .setFooter(`Command Run By ${message.author.tag}`,message.author.avatarURL())
        return message.channel.send(embeda)
       }
       else{
           let mentioned = message.mentions.users.first();
           let embeda =new Discord.MessageEmbed()
           .setTitle("Gay r8 Machine")
           .setColor('RANDOM')
           .addField("Result:",`${capitalizeFirstLetter(args[0].toString())} is ${numba}% Gay!`)
           .addField(`Bots Opinion:`, Opinion)
           .setFooter(`Command Run By ${message.author.tag}`,message.author.avatarURL())
           return message.channel.send(embeda)
       }
    }
}