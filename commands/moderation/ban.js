const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans The Selected User",
    usage: ";ban [user]",
    permission: "BAN_MEMBERS",
    aliases: ["ban"],
    run: async (client, message, args) => {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!member) {
            return message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, Specify A Vaild User!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL()))
        } else {
            let reason = args.slice(1).join(" ")
            if (!reason) reason = "No Reason Provided!"

            const targetMember = message.guild.members.cache.get(target.id)
            if (targetMember)
                targetMember.ban({
                    days: 7,
                    reason: reason
                })
            message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, ${targetMember} Has Been Banned!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL()))
            let logsChan = message.guild.channels.cache.find(c => c.name === "logs" && c.type == "text");

            let embed = new Discord.MessageEmbed()
                .setColor("#3edb1f")
                .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
                .addField("Moderation:", "ban")
                .addField("Moderator:", message.author.username)
                .addField("Banned Person:", targetMember.id)
                .addField("Reason:", reason.toString())
                .addField("Date:", message.createdAt)
                .addField("MessageLink:", message.url)
            return logsChan.send(embed);
        }
    }
}