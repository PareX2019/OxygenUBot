const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Bans The Selected User",
    usage: ";ban [user]",
    permission: "BAN_MEMBERS",
    run: async (client, message, args) => {
       if(!message.mentions.first()){
          return message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, Specify A Vaild User!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL()))
       }
       else{
        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No Reason Provided!"
        const target = message.mentions.first()
        const targetMember = message.guild.members.cache.get(target.id)
        if(targetMember)
        targetMember.ban({days:7,reason: reason})
        message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, ${targetMember} Has Been Banned!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL()))
        let logsChan = message.guild.channels.cache.find(c => c.name ==="logs" && c.type=="text");
    
        let embed = new Discord.MessageEmbed()
        .setColor("#3edb1f")
        .setAuthor(`${message.guild.name} ModLogs`,message.guild.iconURL())
        .addField("Moderation:","ban")
        .addField("Moderator:",message.author.username)
        .addField("Banned Person:",member.user.tag)
        .addField("Reason:", reason.toString())
        .addField("Date:",message.createdAt)
        .addField("MessageLink:",message.url)
        return logsChan.send(embed);
        }
    }
}