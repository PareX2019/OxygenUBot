const Discord = require('discord.js');
const command = require('../../handlers/command');
const funcs = require("./functions");

module.exports = {
    name: "report",
    category: "user",
    description: "Allows the user client to report a discord member to the staff members.",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxgygen U | ${name}`)
            .addField("Usage: `;eval [code]`"," ")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
            
             message.channel.send(EmbedYes);
        return;
        }
        else
        {

        }
    }
}