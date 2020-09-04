const Discord = require('discord.js');
const command = require('../../handlers/command');
function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    name: "removeRole",
    category: "moderation",
    description: "removes a role to the selected member.",
    run: async (client, message, args) => {
        if(!args){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | ${this.name}`)
            .addField(`Usage: ';${this.name} [user] [role]'`,`${this.description}`)
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
         if(!rUser.roles.has(gRole.id))
         {
           let embedB = new discord.MessageEmbed()
           .setTitle("Oxygen U | addRole")
           .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
           .setColor("#FF000")
           .addField(`${rUser.name} Doesnt Have That Role!`, "\:x: Error!")
           .setTimestamp()
           .setFooter(message.author.username,message.author.avatarURL());
         }
         await(rUser.removeRole(gRole.id));

         try{
           await  rUser.send(`The Role ${gRole.name} was removed from you!`)
         }catch(e){
            let dmsClosed = new Discord.MessageEmbed()
            .setTitle("Oxygen U | addRole")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField(`Removed The ${gRole.name} To <@${rUser.id}>, I Tried To Dm Him But His Dms Are Off \:pensive:!`, "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.reply(dmsClosed);
            return;
         }

        }
    }
}
