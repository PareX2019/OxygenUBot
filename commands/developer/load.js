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
    run: async (client, message, args) => {
        let rawdata = fs.readFileSync("./commands/developer/backupID.json")
        let backupData = JSON.parse(rawdata);
            if(!args[0])
            {

                if(!message.member.hasPermission("ADMINISTRATOR")){
                    return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
                }
                if(!backupData.backupID)   return  message.reply(":x: |automatic backup loading has failed please try again with a specified backup!");
                backup.fetch(backupData.backupID).then(async () => {
                       
                        backup.load(backupData.backupID, message.guild , {
                            clearGuildBeforeRestore: true
                        })
                }).catch((err) => {
                    console.log(err);
                    return message.channel.send(":x: | No backup found for `"+backupData.backupID+"`!");
                });


                setTimeout(function(){
                    let channel = message.guild.channels.cache.find(channel => channel.name === "support" && channel.type === 'text')
                    channel.bulkDelete(100);
                    let bigEmbed = new Discord.MessageEmbed()
                    .setTitle("Ticket System")
                    .setDescription("React With '🎫' Below To Create A Ticket To Get Support To Solve Your Problem!")
                    .setFooter("Ticket System")
                    .setColor("00ff00")
                    channel.send(bigEmbed).then( embed =>{
                        embed.react("🎫");
                    })
                let channel2 = message.guild.channels.cache.find(channel => channel.name === "verify" && channel.type === 'text')
                    let verificationEmbed = new Discord.MessageEmbed()
                    .setTitle("Oxygen U")
                    .setDescription("By Reacting With 👍 You Will Be Given Acess To Oxygen U's Amazing Server!")
                    channel2.send(verificationEmbed).then(embed =>{
                        embed.react("👍");
                    })
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
                    .setDescription("Report Any Bugs in #support")
                    let channel3 = message.guild.channels.cache.find(channel => channel.name === "api" && channel.type === 'text')
                    channel3.send(embed222132);
                    channel3.send(embed6);
                    let embed232 = new Discord.MessageEmbed()
                    .setColor('#00a9be')
                    .setColor('RANDOM')
                    .setTitle("Download(Click Me)")
                    .setURL('https://oxygenu.xyz/OxygenU/Installer.zip')
                    .setFooter('Oxygen U','https://cdn.discordapp.com/icons/763773951833800744/aa71b39acd2798437e765cdfd81dc5a0.png?size=4096')
                    .addField("Tutorial On How To Use:", "https://www.youtube.com/watch?v=NdIpfzhPWjw&t=114s")
                    .setTimestamp();
                    message.guild.channels.cache.find(channel => channel.name === "download" && channel.type === 'text').send(embed232)
                },20000);
            }
            else
            {
                if(!message.member.hasPermission("ADMINISTRATOR")){
                    return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
                }
                let backupID = args[0];
                if(!backupID){
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
                    return message.channel.send(":x: | No backup found for `"+backupID+"`!");
                });
            }
        return;
    }
}