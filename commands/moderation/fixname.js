const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
  name: "fixname",
  category: "moderation",
  description: "Fixes  The Selected User nickname",
  usage: ";fixname [user]",
  permission: "MANAGE_NICKNAMES",
  aliases: ["fixname", "rename"],
  run: async (client, message, args) => {
    if (args[0]) {

      const target = message.guild.member(message.mentions.users.first());



      if (!target){
        let builder = new Discord.MessageEmbed()
        .setTitle("Oxygen U")
        .setDescription("Member not found!");
        return message.reply(builder);
      }

      let numba = Math.floor(1000 + Math.random() * 9000)
      target.setNickname(`I❤OXY#${numba}`, {
        reason: `Fixed Name Run By ${message.author.id}`
      })
      message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, ${target} Has Been Fixed!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL()))
      let logsChan = message.guild.channels.cache.find(c => c.name === "logs" && c.type == "text");

      let embed = new Discord.MessageEmbed()
        .setColor("#3edb1f")
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL())
        .addField("Moderation:", "fixname")
        .addField("Moderator:", message.author.username)
        .addField("Fixed Person:", target.id)
        .addField("Name:", `I❤OXY#${numba}`)
        .addField("Date:", message.createdAt)
        .addField("MessageLink:", message.url)
      return logsChan.send(embed);

    } else {
      message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`Invaild Args :x:`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`, message.author.avatarURL())).then(msg => {
        msg.delete({
          timeout: 5000
        })
      })
    }
  }

}