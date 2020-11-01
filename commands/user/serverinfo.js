const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    category: "user",
    description: "Returns server info",
    usage: ";serverinfo",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
        let big = new Array();
      message.guild.roles.cache.forEach(role =>{
          big.push(role.name)
      })
             const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setAuthor(message.guild.name,message.guild.iconURL())
            .addField("Members:", message.guild.members.length,true)
            .addField("Region:", message.guild.region,true)
            .addField("Owner:", message.guild.owner,true)
            .addField("Total Server Roles:", big.length -1 )
            .addField("Roles:",big.toString())
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
             return message.channel.send(EmbedYes);
    }
}