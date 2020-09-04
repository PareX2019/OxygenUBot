const Discord = require('discord.js');
const command = require('../../handlers/command');
function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    name: "addRole",
    category: "moderation",
    description: "adds a role to the selected member.",
    run: async (client, message, args) => {
        if(!args){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | addRole`)
            .addField(`Usage: ';addRole [user] [role]'`,"\:x: Error!")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());

             message.channel.send(EmbedYes);
        return;
        }
        else
        {
         if(!message.member.hasPermission("MANAGE_MEMBERS")){
             let NoPerms = new Discord.MessageEmbed()
             .setTitle("Oxygen U | addRole")
             .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
             .setColor("#FF000")
             .addField("You Do Not Have The Permission To Do That!", "\:x: Error!")
             .setTimestamp()
             .setFooter(message.author.username,message.author.avatarURL());
             message.reply(NoPerms);
             return;
         }
         let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
         if(!rUser){
            let userNotFound = new Discord.MessageEmbed()
            .setTitle("Oxygen U | addRole")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField("User Not Found!", "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.reply(userNotFound);
            return;
         }
         let role = args.join(" ").slice(22);
         if(!role){
            let roleNotFound = new Discord.MessageEmbed()
            .setTitle("Oxygen U | addRole")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField("Specify A Role!", "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.reply(roleNotFound);
            return;
         }
         let gRole = message.guild.roles.find(`name`,role);
         if(!gRole){
            let roleNotFound2 = new Discord.MessageEmbed()
            .setTitle("Oxygen U | addRole")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField("Role Not Found!", "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.reply(roleNotFound2);
            return;
         }
         if(rUser.roles.has(gRole.id))
         {
           let embedB = new discord.MessageEmbed()
           .setTitle("Oxygen U | addRole")
           .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
           .setColor("#FF000")
           .addField(`${rUser.name} Already has that role!`, "\:x: Error!")
           .setTimestamp()
           .setFooter(message.author.username,message.author.avatarURL());
           return;
         }
         await(rUser.removeRole(gRole.id));

         try{
           await  rUser.send(`You Have Been Given The Role ${gRole.name}!`)
         }catch(e){
            let dmsClosed = new Discord.MessageEmbed()
            .setTitle("Oxygen U | addRole")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField(`Added The ${gRole.name} To <@${rUser.id}>, I Tried To Dm Him But His Dms Are Off \:pensive:!`, "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.reply(dmsClosed);
            return;
         }

        }
    }
}
