const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "mute",
    category: "moderation",
    description: "Mutes the selected user",
    permission: "MANAGE_ROLES",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | Mute`)
            .addField(`Usage: ';mute [user] [time] [reason(optional)]'`,"Mute The Ammount Of Messages Provided")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
            
             message.channel.send(EmbedYes).then(msg =>{
                msg.delete({timeout: 5000})
                message.delete({timeout: 5000})
             });
        }
        else{
                let member = message.guild.member(message.mentions.users.first()||message.guild.members.cache.get(args[1]))
                let reason = args.slice(1).join(" ")
                let time = args[1];
                let logsChan = message.guild.channels.cache.find(c => c.name ==="logs" && c.type=="text");

                if(!time){
                    let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle("Oxygen U")
                    .setDescription("Please Specify A Time!")
                    .setColor("#00000")
                    .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
                    return message.reply(noPermEmbed).then(msg =>{
                        msg.delete({timeout: 5000})
                        message.delete({timeout: 5000})
                     });
                }

                if(!member){
                    let noPermEmbed = new Discord.MessageEmbed()
                    .setTitle("Oxygen U")
                    .setDescription("Please Mention A User!")
                    .setColor("#00000")
                    .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
                    return message.reply(noPermEmbed).then(msg =>{
                        msg.delete({timeout: 5000})
                        message.delete({timeout: 5000})
                     });
                }

                let embed1 = new Discord.MessageEmbed()
                .setColor("#3edb1f")
                .setAuthor(`${message.guild.name} ModLogs`,message.guild.iconURL())
                .addField("Member:",member.user.tag)
                .addField("Case:","unmuted")
                .addField("Moderator:",message.author.username)
                .addField("Date:",message.createdAt)
                .addField("Reason:", reason)
                .addField("MessageLink:",message.url);
            

                if(!reason) reason = "No Reason Provided!"
                let muterole = message.guild.roles.cache.find(x=> x.name === "Muted")
                member.roles.add(muterole.id).then(()=>{
                    member.send(`You Have Been Muted for **${reason}**`);
                    message.channel.send(`${member.user.tag} was sucesfully muted for ${time}`)
                    setTimeout(function(){
                        member.roles.remove(muterole.id)
                        member.send(`You Have Been UnMuted In Oxygen U`);
                        logsChan.send(embed1);
                    },ms(time))
                });



                let embed = new Discord.MessageEmbed()
                .setColor("#3edb1f")
                .setAuthor(`${message.guild.name} ModLogs`,message.guild.iconURL())
                .addField("Moderation:","mute")
                .addField("Moderator:",message.author.username)
                .addField("Muted Person:",member.user.username)
                .addField("Date:",message.createdAt)
                .addField("Reason:", reason)
                .addField("MessageLink:",message.url)
                .addField("Time Muted:",time);
                logsChan.send(embed);
            }      
    }
}