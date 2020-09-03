const {inspect} = require("util");
const Discord = require('discord.js');

module.exports = {
    name: "eval",
    category: "developer",
    description: "Allows the developers to run JavaScript code.",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U")
            .addField("Usage: `;eval [code]`")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL);
            
             message.channel.send(EmbedYes);
        } 
        let code = `(async () => {${args.join(" ")}})()`;
        try {
            let evaluated = inspect(eval(code, {depth: 0}));
            if(evaluated.includes('client.token')|| code.includes('client.token')){
                const monkEmbed = new Discord.MessageEmbed()
                .setColor('#00a9be')
                .setTimestamp()
                .setTitle("Oxgygen U")
                .addField(`Some Monkey Called ${message.author.username} Just Tried To Get ${client.user.username} Token.`)
                .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL);

                client.channels.cache.get('750704480433078352').send(monkEmbed);
            }
            const CorrectEmbed = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U")
            .addField(`Ran the code. Output: \`\`\`${evaluated.toString()}\`\`\``)
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL);
            if(args.length > 1){
                message.channel.send(CorrectEmbed);
                return;
            }
        } catch(err) {
            const errorEmbed = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U")
            .addField(`Code failed to run. Output: \`\`\`${err.message.toString()}\`\`\``)
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL);
            
            if(args.length > 1){
                 message.channel.send(errorEmbed);
                 return;
            } 
        }
    }
}