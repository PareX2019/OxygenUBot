const Discord = require('discord.js');
const command = require('../../handlers/command');
const talkedRecently = new Set();

module.exports = {
    name: "report",
    category: "user",
    description: "Allows the user client to report a discord member to the staff members.",
    permission: "SEND_MESSAGES",
    usage: ";report [user] [reason]",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | Report`)
            .addField(`Usage: ';report [Reason]'`,"\:x: Error!")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
            
             message.channel.send(EmbedYes);
             return;
        }
        else
        {
        if (talkedRecently.has(message.author.id)) {
               message.author.send("You Already Used This Command Please Wait 10m To Use This Again!");
        } 
        else 
        {

            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!rUser) return message.reply("Couldn't Find User!");
            let reason = args.join(" ").slice(22);
   
            let reportEmbed = new Discord.MessageEmbed()
            .setDescription("Reports | Oxygen U")
            .setColor("#00a9be")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By",`${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time",message.createdAt)
            .addField("MessageLink",message.url)
            .addField("Reason", reason)
           message.reply("Sent Your Report, Thank You For Your Feedback!");
            client.channels.cache.find(channel => channel.name === "reports").send(reportEmbed);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
              talkedRecently.delete(message.author.id);
            }, 600000);
        }
        }
    }
}