const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    category: "user",
    description: "Returns Avatar",
    usage: ";avatar",
    permission: "SEND_MESSAGES",
    aliases: ["avatar","icon","av","pfp"],
    run: async (client, message, args) => {
        if (!args[0]) {
            let embeda2 = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}'s Avatar`)
                .setColor('RANDOM')
                .setImage(message.author.avatarURL())
                .setFooter(`Run By ${message.author.tag}`, message.author.avatarURL());
            return message.channel.send(embeda2)
        } else {
            let mentioned = message.mentions.users.first();

            if (!mentioned) return message.reply("Invaild User :x:");

            let embeda = new Discord.MessageEmbed()
                .setTitle(`${mentioned.username}'s Avatar`)
                .setColor('RANDOM')
                .setImage(mentioned.avatarURL())
                .setFooter(`Run By ${message.author.tag}`, message.author.avatarURL());
            return message.channel.send(embeda)
        }
    }
}