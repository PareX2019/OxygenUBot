const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kicks The Selected User",
  usage: ";kick [user]",
  permission: "KICK_MEMBERS",
  aliases: ["kick"],
  run: async (client, message, args) => {
    if (args[0]) {

      const target = message.guild.member(message.mentions.users.first());
      let reason = args.slice(1).join(" ")
      if (!reason) reason = "No Reason Provided!"
      if (!target) {
        return message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, Specify A Vaild User!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL()))
      } else {
        const targetMember = message.guild.members.cache.get(target.id)
        if (client.user.hasPer)
          targetMember.kick({
            reason: reason.toString()
          })
        message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, ${targetMember} Has Been Kicked!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL()))
        let logsChan = message.guild.channels.cache.find(c => c.name === "logs" && c.type == "text");

        let embed = new Discord.MessageEmbed()
          .setColor("#3edb1f")
          .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
          .addField("Moderation:", "kick")
          .addField("Moderator:", message.author.username)
          .addField("Banned Person:", targetMember.id)
          .addField("Reason:", reason.toString())
          .addField("Date:", message.createdAt)
          .addField("MessageLink:", message.url)
        return logsChan.send(embed);
      }
    } else {
      message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`Invaild Args :x:`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL())).then(msg => {
        msg.delete({
          timeout: 5000
        })
      })
    }
  }

}