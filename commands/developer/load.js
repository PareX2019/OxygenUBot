const Discord = require('discord.js');
const command = require('../../handlers/command')
const backup = require('discord-backup');
const fs = require('fs');

module.exports = {
    name: "load",
    category: "developer",
    description: "loads backup",
    permission: "SEND_MESSAGES",
    usage: ";load [backUpId]",
    aliases: ["load"],
    run: async (client, message, args) => {
        let rawdata = fs.readFileSync("./commands/developer/backupID.json")
        let backupData = JSON.parse(rawdata);
        if (!args[0]) {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
            }
            if (!backupData.backupID) return message.reply(":x: |automatic backup loading has failed please try again with a specified backup!");
            backup.fetch(backupData.backupID).then(async () => {

                backup.load(backupData.backupID, message.guild, {
                    clearGuildBeforeRestore: true
                })
            }).catch((err) => {
                console.log(err);
                return message.channel.send(":x: | No backup found for `" + backupData.backupID + "`!");
            });
        } else {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
            }
            let backupID = args[0];
            if (!backupID) {
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
                return message.channel.send(":x: | No backup found for `" + backupID + "`!");
            });
        }
        return;
    }
}