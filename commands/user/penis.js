const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "penis",
    category: "user",
    description: "Returns your pp size",
    usage: ";penis @user[optional]",
    permission: "SEND_MESSAGES",
    aliases: ["ppsize", "penis", "penis", "dick", "dickR8"],
    run: async (client, message, args) => {
        let answers = [
            "8=D",
            "8==D",
            "8===D",
            "8====D",
            "8=====D",
            "8======D",
            "8=======D",
            "8========D",
            "8=========D",
            "8===========D",
            "8============D",
            "8=============D",
            "8==============D",
            "8===============D"
        ]
        let random = Math.floor(Math.random() * answers.length);
        let ppGen = answers[random];
        let opinion = "Damn It Do Be Small";
        if (random > 5) opinion = "Damn Nice Cock lol";

        if (!args[0]) {
            let embeda = new Discord.MessageEmbed()
                .setAuthor(`${message.author.username}'s pp`)
                .setColor('RANDOM')
                .setDescription(ppGen)
                .addField("Bots Opinion On You!", opinion)
                .setFooter(`Command Run By ${message.author.tag}`, message.author.avatarURL())
            return message.channel.send(embeda)
        } else {
            let embeda = new Discord.MessageEmbed()
                .setAuthor(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)}'s pp`)
                .setColor('RANDOM')
                .setDescription(ppGen)
                .addField(`Bots Opinion:`, opinion)
                .setFooter(`Command Run By ${message.author.tag}`, message.author.avatarURL())
            return message.channel.send(embeda)
        }
    }
}