const Discord = require('discord.js');
const command = require('../../handlers/command');
const usedRecently = new Set();

module.exports = {
    name: "reportBug",
    category: "user",
    description: "Allows the user client to report a Bug to the Developers",
    permission: "SEND_MESSAGES",
    usage: ";reportBug  [bug]",
    run: async (client, message, args) => {
       
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | ReportBug`)
            .addField(`Usage: ';reportBug [Bug]'`,"\:x: Error!")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
            
             message.channel.send(EmbedYes);
             return;
        }
        else
        {
        if (talkedRecently.has(message.author.id)) {
               message.author.send("You Already Used This Command Please Wait 10m To Use This Again!❌");
        } 
        else 
        {
            let reason = args.join(" ").slice(22);
            let reportEmbed = new Discord.MessageEmbed()
            .setDescription("ReportsBugs | Oxygen U")
            .setColor("#00a9be")
            .addField("Reported By",`${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time",message.createdAt)
            .addField("MessageID",message.url)
            .addField("Bug", reason)
            message.reply("Sent Your Report, Thank You For Your Feedback!✅");
            client.channels.cache.find(channel => channel.name === "bugs").send(reportEmbed);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
              talkedRecently.delete(message.author.id);
            }, 600000);
        }
        }
    }
}