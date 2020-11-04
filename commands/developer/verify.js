const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "verify",
    category: "developer",
    description: "Returns veriy embed",
    usage: ";verify",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
        let verificationEmbed = new Discord.MessageEmbed()
        .setTitle("Oxygen U")
        .setDescription("By Reacting With 👍 You Will Be Given Acess To Oxygen U's Amazing Server!")
        message.channel.send(verificationEmbed).then(embed =>{
            embed.react("👍");
        })
        message.delete();
    }
}