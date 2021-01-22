const Discord = require('discord.js');
const beautify = require('beautify');

module.exports = {
    name: "reload",
    category: "developer",
    description: "reloads all the commands/bot cache",
    permission: "SEND_MESSAGES",
    usage: ";reload",
    aliases: ["reload","restart","reboot"],
    run: async (client, message, args) => {
       client.commands.clear();
       var a = require("../../handlers/command")(client); 
       let bigEmbed = new Discord.MessageEmbed()
            .setTitle("Command Handler has responded with")
            .setDescription(`\`\`\`${a}\`\`\``)
            .setFooter("Commands Reloaded!", message.guild.iconURL())
            .setColor("00ff00");
        message.reply(bigEmbed);
    }
}