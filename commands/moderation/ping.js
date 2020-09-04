const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "ping",
    category: "moderation",
    description: "Returns pong",
    run: async (client, message, args) => {
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | Ping`)
            .addField("Pong!")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
             message.channel.send(EmbedYes);
        return;
    }
}