const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "softban",
    category: "moderation",
    description: "SoftBans The Selected User",
    usage: ";softban [user]",
    permission: "BAN_MEMBERS",
    run: async (client, message, args) => {
      if(!message.member.permissions.has('ADMINISTRATOR') ||  message.member.permissions.has('BAN_MEMBERS')){
        let noPermEmbed = new Discord.MessageEmbed()
        .setTitle("Oxygen U")
        .setDescription("Missing Permissions!")
        .setColor("#00000")
        .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
        return message.reply(noPermEmbed).then(msg =>{
            msg.delete({timeout: 5000})
            message.delete({timeout: 5000})
         });
    }
   const target = message.mentions.users.first();
   let reason = args.slice(1).join(" ")
   if(!reason) reason = "No Reason Provided!"
   if(!target){
      return message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, Specify A Vaild User!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL()))
   }
   else{
    const targetMember = message.guild.members.cache.get(target.id)
    targetMember.ban({days:7,reason: reason})
    targetMember.unban();
    message.channel.send(new Discord.MessageEmbed().setTitle("Oxygen U").setDescription(`<@${message.author.id}>, ${targetMember} Has Been softBanned!`).setColor("#00000").setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL()))
    let logsChan = message.guild.channels.cache.find(c => c.name ==="logs" && c.type=="text");

    let embed = new Discord.MessageEmbed()
    .setColor("#3edb1f")
    .setAuthor(`${message.guild.name} ModLogs`,message.guild.iconURL())
    .addField("Moderation:","softBan")
    .addField("Moderator:",message.author.username)
    .addField("Banned Person:",member.user.tag)
    .addField("Reason:", reason.toString())
    .addField("Date:",message.createdAt)
    .addField("MessageLink:",message.url)
    logsChan.send(embed);
    return;
    }
  }
}