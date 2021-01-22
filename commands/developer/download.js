const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "download",
    category: "developer",
    description: "Returns download embed",
    usage: ";download",
    permission: "SEND_MESSAGES",
    aliases: ["download"],
    run: async (client, message, args) => {
        let embed232 = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setColor('RANDOM')
            .setTitle("Download(Click Me)")
            .setURL('https://oxygenu.xyz/OxygenU/Installer.zip')
            .setFooter('Oxygen U', 'https://cdn.discordapp.com/icons/763773951833800744/aa71b39acd2798437e765cdfd81dc5a0.png?size=4096')
            .addField("Tutorial On How To Use:", "https://www.youtube.com/watch?v=NdIpfzhPWjw&t=114s")
        message.channel.send(embed232);
        message.delete();

    }
}