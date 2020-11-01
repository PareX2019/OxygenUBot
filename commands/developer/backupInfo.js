const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require('fs');
const backup = require('discord-backup');

module.exports = {
    name: "info",
    category: "developer",
    description: "Returns BackUp Info",
    permission: "SEND_MESSAGES",
    usage: ";info [BACKUPID]",
    run: async (client, message, args) => {
       if(args[0])
       {
        let backupID2 = args[0];
        backup.fetch(backupID2).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}/${yyyy}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor("Backup Informations")
                .addField("Backup ID", backupInfos.id, false)
                .addField("Server ID", backupInfos.data.guildID, false)
                .addField("Size", `${backupInfos.size} mb`, false)
                .addField("Created at", formatedDate, false)
                .setColor("#FF0000");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(":x: | No backup found for `"+backupID2+"`!");
        });
    }
    else
    {
        let rawdata = fs.readFileSync("./commands/developer/backupID.json")
        let backupData = JSON.parse(rawdata);
        let backupID = backupData.backupID.toString();
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}/${yyyy}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor("Backup Informations")
                .addField("Backup ID", backupInfos.id, false)
                .addField("Server ID", backupInfos.data.guildID, false)
                .addField("Size", `${backupInfos.size} mb`, false)
                .addField("Created at", formatedDate, false)
                .setColor("#FF0000");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(":x: | Failed To Find Backup.");
        });
    }
    }
}