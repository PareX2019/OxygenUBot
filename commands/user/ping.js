const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "ping",
    category: "user",
    description: "Returns pong with latency.",
    usage: ";ping",
    permission: "SEND_MESSAGES",
    aliases: ["ping","latency"],
    run: async (client, message, args) => {
        const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | Ping`)
            .setDescription("Pong!")
            .addField("Answer:", `Latency: ${Date.now() - message.createdTimestamp}ms.`)
            .addField(`API Latency is ${Math.round(client.ws.ping)}ms`)
            .setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL());
        message.channel.send(EmbedYes);
    }
}