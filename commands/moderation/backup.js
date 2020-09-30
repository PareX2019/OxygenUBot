const Discord = require('discord.js');
const command = require('../../handlers/command');
const backup = require('discord-backup');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "backup",
    category: "moderation",
    description: "Back Ups The Server",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
        }
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            
            let data = {
               backupID: backupData.id
            };
            fs.writeFileSync(path.resolve(__dirname, 'backupID.json'), JSON.stringify(data));
            message.author.send(`The backup has been created! To load it, type this command on the server of your choice: ;loadBackup ${backupData.id} or just write ;loadBackup and it should automatically load the latest backup`);
            message.reply(":white_check_mark: Backup successfully created.");
        });
        return;
    }
}