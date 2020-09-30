const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "purge",
    category: "moderation",
    description: "Clears The Ammount Of Messages Provided",
    run: async (client, message, args) => {
        if (message.member.permissions.has("MANAGE_MESSAGES")){
            let deleteAmmount;
            if (isNaN(args[0]) || parseInt(args[0]) <= 0){
                   let noNumber = new Discord.MessageEmbed()
                   .setTitle("That Is Not A Number!")
                   .setDescription(`${args[0]} is not a number!`)
                   .setColor("#FF0000");
                   message.reply(noNumber);
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
                message.reply(big).then(m => m.delete({timeout: 3000}));
                   
                
               }
            return;
        }
        else{
            let noPermEmbed = new Discord.MessageEmbed()
            .setTitle("Oxygen U")
            .setDescription("Missing Permissions!");
            return message.reply(noPermEmbed);
        }
     
    }
}