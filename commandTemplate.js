const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "8ball",
    category: "user",
    description: "Returns An 8ball Output to the clients question",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle(`Oxygen U | ${this.name}`)
            .addField(`Usage: ';${this.name} [question]'`,`${this.description}`)
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
            
             message.channel.send(EmbedYes);
        return;
        }
        else
        {

        }
    }
}