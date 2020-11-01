const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "clear",
    category: "moderation",
    description: "Clears The Ammount Of Messages Provided",
    usage: ";clear [ammount]",
    permission: "MANAGE_MESSAGES",
    run: async (client, message, args) => {
    if(!args[0]){
        const EmbedYes = new Discord.MessageEmbed()
        .setColor('#00a9be')
        .setTimestamp()
        .setTitle(`Oxygen U | Clear`)
        .addField(`Usage: ';Clear [number]'`,"Clears The Ammount Of Messages Provided")
        .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
        
         message.channel.send(EmbedYes).then(msg =>{
            msg.delete({timeout: 5000})
            message.delete({timeout: 5000})
         });
    return;
    }
    if (message.member.permissions.has("MANAGE_MESSAGES")){
        let deleteAmmount;
        if (isNaN(args[0]) || parseInt(args[0]) <= 0){
               let noNumber = new Discord.MessageEmbed()
               .setTitle("That Is Not A Number! ❌")
               .setDescription(`${args[0]} is not a number! ❌`)
               .setColor("#FF0000");
               message.reply(noNumber).then(msg =>{
                   msg.delete({timeout: 3000})
                   message.delete({timeout: 3000})
                });
               return;
           }
           else{
               deleteAmmount = parseInt(args[0])
      if(parseInt(args[0]) > 100){
          message.delete();
        return message.reply("You Can Only Delete 100 messsages per time! :x:").then(m => m.delete({timeout: 3000}));
      }
               let big = new Discord.MessageEmbed()
               .setTitle("Purge Successfully")
               .setDescription(`Sucesfully Purged ${deleteAmmount} messsages`);
            message.channel.bulkDelete(deleteAmmount,true);
            message.reply(big).then(m => {
                m.delete({timeout: 3000})
            });
            let logsChan = message.guild.channels.cache.find(c => c.name ==="oxygen-u-logs" && c.type=="text");
    
            let embed = new Discord.MessageEmbed()
            .setColor("#3edb1f")
            .setAuthor(`${message.guild.name} ModLogs`,message.guild.iconURL())
            .addField("Moderation:","clear")
            .addField("Moderator:",message.author.username)
            .addField("Ammount:", deleteAmmount)
            .addField("Date:",message.createdAt)
            .addField("MessageLink:",message.url)
           return logsChan.send(embed); 
           }
    }
    else{
        let noPermEmbed = new Discord.MessageEmbed()
        .setTitle("Oxygen U")
        .setDescription("Missing Permissions! :x:");
        return message.reply(noPermEmbed).then(msg =>{
            msg.delete({timeout: 5000})
            message.delete({timeout: 5000})
         });
    }
}}