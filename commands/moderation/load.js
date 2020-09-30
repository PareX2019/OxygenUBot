const Discord = require('discord.js');
const command = require('../../handlers/command')
const backup = require('discord-backup');
const fs = require('fs');

module.exports = {
    name: "load",
    category: "moderation",
    description: "loads backup",
    run: async (client, message, args) => {
        let rawdata = fs.readFileSync("./commands/moderation/backupID.json")
        let backupData = JSON.parse(rawdata);
            if(!args[0])
            {
                if(!message.member.hasPermission("ADMINISTRATOR")){
                    return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
                }
                if(!backupData.backupID)   return  message.reply(":x: |automatic backup loading has failed please try again with a specified backup!");
                backup.fetch(backupData.backupID).then(async () => {
                        message.author.send(":white_check_mark: | Start loading the backup!");
                        backup.load(backupData.backupID, message.guild , {
                            clearGuildBeforeRestore: true
                        })
                }).catch((err) => {
                    console.log(err);
                    return message.channel.send(":x: | No backup found for `"+backupData.backupID+"`!");
                });


                setTimeout(function(){
                    let channel = message.guild.channels.cache.find(channel => channel.name === "support" && channel.type === 'text')
                    let bigEmbed = new Discord.MessageEmbed()
                    .setTitle("Ticket System")
                    .setDescription("React With '🎫' Below To Create A Ticket To Get Support To Solve Your Problem!")
                    .setFooter("Ticket System")
                    .setColor("00ff00")
                    channel.send(bigEmbed).then( embed =>{
                        embed.react("🎫");
                    })
                },20000);

            }
            else
            {
                if(!message.member.hasPermission("ADMINISTRATOR")){
                    return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
                }
                let backupID = args[0];
                if(!backupID){
                    return message.channel.send(":x: | You must specify a valid backup ID!");
                }
                backup.fetch(backupID).then(async () => {
                        message.author.send(":white_check_mark: | Start loading the backup!")
                        backup.load(backupID, message.guild).then(() => {
                            backup.remove(backupID);
                        }).catch((err) => {
                            return message.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
                        });
                }).catch((err) => {
                    console.log(err);
                    return message.channel.send(":x: | No backup found for `"+backupID+"`!");
                });
            }
        return;
    }
}