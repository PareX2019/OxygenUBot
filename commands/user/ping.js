const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "ping",
    category: "user",
    description: "Returns pong with latency.",
    run: async (client, message, args) => {
             let o = new Date().getTime();
             const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | Ping`)
            .addField("Answer:",`Pong!- (${new Date().getTime() - o}ms)`)
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
             message.channel.send(EmbedYes);
        return;
    }
}