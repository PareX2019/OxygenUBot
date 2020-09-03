const Discord = require('discord.js');
const beautify = require("beautify");

module.exports = {
    name: "eval",
    category: "developer",
    description: "Allows the developers to run JavaScript code.",
    run: async (client, message, args) => {
        if(!args[0]){
            const EmbedYes = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U | Eval")
            .addField("Usage: `;eval [code]`"," ")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
            
             message.channel.send(EmbedYes);
        return;
        }
        else{
            if(args.includes('token')){
                const monkEmbed = new Discord.MessageEmbed()
                .setColor('#00a9be')
                .setTimestamp()
                .setTitle("Oxgygen U")
                .addField(`Some Monkey Called ${message.author.username}| ${message.author.id}Just Tried To Get ${client.user.username} Token.`," ")
                .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());

                client.channels.cache.get('750704480433078352').send(monkEmbed);
                return;
            }
            else{
                try{
                    const toEval = args.join(" ");
                    const evaluated = eval(toEval);

                    const CorrectEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setTitle("Oxgygen U | Eval")
                    .addField("To Evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format : "js"})}\`\`\``)
                    .addField("Evaluated:", evaluated)
                    .addField("Type of:",typeof(evaluated))
                    .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
        
                    message.channel.send(CorrectEmbed);
                    return;
        
                }catch(err) {
                    const errorEmbed = new Discord.MessageEmbed()
                    .setColor('#FF000')
                    .setTimestamp()
                    .setTitle("\:x: Error! | Oxygen U | Eval")
                    .setDescription(err)
                    .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
                    
                    message.channel.send(errorEmbed);
                    return;
                }
            }
        }
    }
}