const {inspect} = require("util");
const discord = require("discord.js");
module.exports = {
    name: "eval",
    category: "developer",
    description: "Allows the developers to run JavaScript code.",
    run: async (Bot, message, args) => {
        if(!args[0]){
            let EmbedYes = new discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U")
            .addField("Usage: `~eval [code]`")
            .addFooter(`Command Run By ${message.author.username}`,message.author.avatarURL)
            
            return message.channel.send(EmbedYes);
        } 
        let code = `(async () => {${args.join(" ")}})()`;
        try {
            let evaluated = inspect(eval(code, {depth: 0}));
            if(evaluated.includes(Bot.token) && code.includes(Bot.token)){
                let monkEmbed = new discord.MessageEmbed()
                .setColor('#00a9be')
                .setTimestamp()
                .setTitle("Oxgygen U")
                .addField(`Some Monkey Called ${message.author.username} Just Tried To Get ${Bot.user.username} Token.`)
                .addFooter(`Command Run By ${message.author.username}`,message.author.avatarURL)

                return  Bot.channels.get('750704480433078352').send(monkEmbed);
            }
            let CorrectEmbed = new discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U")
            .addField(`Ran the code. Output: \`\`\`js ${evaluated}\`\`\``)
            .addFooter(`Command Run By ${message.author.username}`,message.author.avatarURL)

            return message.channel.send(CorrectEmbed);
        } catch(err) {
            let errorEmbed = new discord.MessageEmbed()
            .setColor('#00a9be')
            .setTimestamp()
            .setTitle("Oxgygen U")
            .addField(`Code failed to run. Output: \`\`\`${err.message}\`\`\``)
            .addFooter(`Command Run By ${message.author.username}`,message.author.avatarURL)
            
            return message.channel.send(errorEmbed);
        }
    }
}