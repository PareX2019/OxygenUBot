const Discord = require('discord.js');
const command = require('../../handlers/command');
const backup = require('discord-backup');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "backup",
    category: "developer",
    description: "Back Ups The Server",
    permission: "SEND_MESSAGES",
    usage: ";backup",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
        }
        message.delete();
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            
            let data = {
               backupID: backupData.id
            };
            fs.writeFileSync(path.resolve(__dirname, 'backupID.json'), JSON.stringify(data));
            message.reply(":white_check_mark: Backup successfully created.");
        });
    }
}