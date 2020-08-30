const Discord = require("discord.js");

module.exports = {
    name: 'download',
    description : "returns downloading embed.",
    execute(message, args){
        
        let embed = new Discord.MessageEmbed()
        .setColor('#00a9be')
        .setColor('RANDOM')
        .setTitle("Download(Click Me)")
	    .setURL('https://cdn.discordapp.com/attachments/632259135525879809/741010292963672104/Installer.exe')
        .setFooter('Oxygen U','https://oxygenu.xyz/Assets/Oxygen%20X%20Logo.png')
        .setTimestamp();

        message.channel.send(embed);

    }
}