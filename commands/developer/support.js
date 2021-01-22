const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "support",
    category: "developer",
    description: "Returns ssupport embed",
    usage: ";support",
    permission: "SEND_MESSAGES",
    aliases: ["support"],
    run: async (client, message, args) => {
        let bigEmbed = new Discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React With '🎫' Below To Create A Ticket To Get Support To Solve Your Problem!")
            .setFooter("Ticket System")
            .setColor("00ff00")
        message.channel.send(bigEmbed).then(embed => {
            embed.react("🎫");
        })
        message.delete();
    }
}