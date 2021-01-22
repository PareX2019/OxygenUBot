const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");
const reddit = require('random-puppy')

module.exports = {
    name: "meme",
    category: "user",
    description: "Returns a random meme",
    usage: ";meme",
    permission: "SEND_MESSAGES",
    aliases: ["meme"],
    run: async (client, message, args) => {
        let subReddits = ["dankmemes", "meme", "memes", "funny", "wholesssomememes", "comedyheaven"];
        const randomSub = subReddits[Math.floor(Math.random() * subReddits.length)];

        const Image = await reddit(randomSub);
        const embedMeme = new Discord.MessageEmbed()
            .setColor('#f25e13')
            .setTitle(`Random Meme`)
            .setURL(`https://reddit.com/r/${randomSub}`)
            .setImage(Image)
            .setDescription(`SubReddit: r/${randomSub}`);
        message.channel.send(embedMeme);
        return;
    }
}