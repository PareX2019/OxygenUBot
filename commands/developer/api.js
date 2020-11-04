const Discord = require('discord.js');
const command = require('../../handlers/command');
const fs = require("fs");

module.exports = {
    name: "verify",
    category: "developer",
    description: "Returns veriy embed",
    usage: ";verify",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
        let embed222132 = new Discord.MessageEmbed()
        .setColor('#00a9be')
        .setTitle("Official Documentation Of Oxygen U's API(Click Me For Download)")
        .setURL("https://file-link.net/70081/oxygenuapi")
        .setFooter('Have Fun And Make Sure To Report Any Bugs','https://cdn.discordapp.com/icons/763773951833800744/aa71b39acd2798437e765cdfd81dc5a0.png?size=4096')
        .setAuthor('Brought By Developers For Developers!')
        .setDescription("Report Any Bugs in #support")
        .addField("Adding it as a Reference","You need to add it as a reference like any other Roblox Exploiting API First.")
        .addField("Accessing the Client Class.", `\`\`\`csharp\n OxygenU_API.Client _Client = new OxygenU_API.Client();\n\`\`\``)
        .addField("This Should Be In You Form's Load, It gets you the latest update.",`\`\`\`csharp\n _Client.IntializeUpdate(); \n\`\`\``)
        .addField("isOXygenUAttached returns a boolean.",`\`\`\`csharp\n if (_Client.isOXygenUAttached())
        return true;
    else
        return false; \n\`\`\``)
        .addField("Execute Will Send The String To Roblox.",`\`\`\`csharp\n_Client.Execute(string);\n\`\`\``)
        .addField("Attach Will Inject OxygenUBytecode To Roblox.",`\`\`\`csharp\n_Client.Attach();\n\`\`\``)
        .addField("Join_DiscordServer Does What It Says Just Put The Discord Server Invite And You Can Select If You Want Output Or Not.",`\`\`\`csharp\n_Client.Join_DiscordServer("DfsBW9W", false);\n\`\`\``)
        .addField("It Kills The Roblox Process.",`\`\`\`csharp\n_Client.KillRoblox();\n\`\`\``)
        .addField("Simple Tutorial Video", "https://www.youtube.com/watch?v=3NiJbcBUZXA&t=34s")
        .addField("READ ME: ","This Is Meant For People That Know The Basics Of C#, If You Do Not Then Please Do Not Use.")

        let embed6 = new Discord.MessageEmbed()
        .setColor('#00a9be')
        .setTitle("Official Template For OxygenU API")
        .setURL("https://file-link.net/70081/template")
        .setFooter('Have Fun And Make Sure To Report Any Bugs','https://cdn.discordapp.com/icons/763773951833800744/aa71b39acd2798437e765cdfd81dc5a0.png?size=4096')
        .setAuthor('Brought By Developers For Developers!')
        .setDescription("Report Any Bugs in the ticket system!")
        message.channel.send(embed222132);
        message.channel.send(embed6);
        message.delete();
    }
}