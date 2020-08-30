const Discord = require("discord.js");
const beautify = require('beautify');

module.exports = {
    name: 'oxy_api',
    description : "returns API embed",
    execute(message, args){
        if(message.author.id === '503471433415000079')
        {


         let embed = new Discord.MessageEmbed()
        .setColor('#00a9be')
        .setTitle("Official Documentation Of Oxygen U's API(Click Me For Download)")
        .setURL("https://cdn.discordapp.com/attachments/629365751303766036/749377736346304603/OxygenU_API.zip")
        .setFooter('Have Fun And Make Sure To Report Any Bugs','https://oxygenu.xyz/Assets/Oxygen%20X%20Logo.png')
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

        let embed2 = new Discord.MessageEmbed()
        .setColor('#00a9be')
        .setTitle("Official Template For OxygenU API")
        .setURL("https://cdn.discordapp.com/attachments/740914324784152596/749402240166395987/Template.zip")
        .setFooter('Have Fun And Make Sure To Report Any Bugs','https://oxygenu.xyz/Assets/Oxygen%20X%20Logo.png')
        .setAuthor('Brought By Developers For Developers!')
        .setDescription("Report Any Bugs in #support")

        message.channel.send(embed);
        message.channel.send(embed2);
        }
        else
        {
            return;
        }
    }
}