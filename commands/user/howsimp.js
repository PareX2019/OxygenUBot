const Discord = require('discord.js');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



module.exports = {
    name: "howsimp",
    category: "user",
    description: "Returns howsimp",
    usage: ";howsimp @user[optional]",
    permission: "SEND_MESSAGES",
    aliases: ["simpDetect","howsimp","simpR8"],
    run: async (client, message, args) => {
        let numba = Math.floor((Math.random() * 100) + 1);
        let Opinion = " good job not simping i see";
        if (numba > 50) {
            Opinion = "lol its a simp 😳";
        }
        if (!args[0]) {
            let embeda = new Discord.MessageEmbed()
                .setTitle("Simp r8 Machine")
                .setColor('RANDOM')
                .addField("Result:", `Your ${numba}% Simping!`)
                .addField("Bots Opinion On You!", Opinion)
                .setFooter(`Command Run By ${message.author.tag}`, message.author.avatarURL())
            return message.channel.send(embeda)
        } else {
            let mentioned = message.mentions.users.first();
            let embeda = new Discord.MessageEmbed()
                .setTitle("Simp r8 Machine")
                .setColor('RANDOM')
                .addField("Result:", `${capitalizeFirstLetter(args[0].toString())} is ${numba}% Simping!`)
                .addField(`Bots Opinion:`, Opinion)
                .setFooter(`Command Run By ${message.author.tag}`, message.author.avatarURL())
            return message.channel.send(embeda)
        }
    }
}