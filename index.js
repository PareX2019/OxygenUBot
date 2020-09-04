const Discord = require("discord.js")
const client = new Discord.Client({disableMentions: "everyone"});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
require("./handlers/command.js")(client);


function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const fs = require("fs");
const talkedRecently = new Set();

client.once('ready', () => {
    console.log(`${client.user.username} is now Running.`);

    client.user.setActivity("over Oxygen U's Server", {typ: "WATCHING"});
});

client.on('message' , async message =>{
    
       if(message.author.bot) return;
        if(message.content.includes("help")||message.content.includes("Help")||message.content.includes("HELP")){
            if(message.member.roles.cache.has('710416627409223737')||message.member.roles.cache.has('710416627409223733')||message.member.roles.cache.has('726754550903603241')||message.member.roles.cache.has('710416627409223738')||message.member.roles.cache.has('744665470615158877')||message.member.roles.cache.has('710416627413549127')) return;
            if (talkedRecently.has(message.author.id)) {
                return;
        } else {
            if(message.channel.parentID === '710416628206010426'){
                const ChannelName = client.channels.cache.get("744650457506512896");
             message.reply(`You Can Get Oxygen U Related Help In ${ChannelName.toString()} By Reacting With The 📩 Emoji :)`);
            }
            else
            {
                return;
            }
            talkedRecently.add(message.author.id);
            setTimeout(() => {
              talkedRecently.delete(message.author.id);
            }, 600000);
        }
    }

    let inviteLinks = ["discord.gg","discord.com/invite","discordapp.com/invite","discord.io","discord.link","invite.gg"]
    let iploggerLinks = ["grabify.org","iplogger.com","grabify.link","iplogger.org","2no.co","iplogger.com","iplogger.ru","iplogger.ru","yip.su","yip.su","iplogger.co","iplogger.info","ipgrabber.ru<","ipgraber.ru","iplis.ru","02ip.ru","ezstat.ru"]
    if(!message.member.hasPermission("VIEW_AUDIT_LOG")){
        if(inviteLinks.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            return message.reply('Server Invites Are Forbiden!')
        }
        if(iploggerLinks.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            return message.guild.members.cache.get(message.author.user.id).ban('Posting IP Loggers thanks to masterzz sexy auto mod they just got banned.(spoonfed me yes)')
        }
    }
    const responding = message.content.toLowerCase()
    if(responding === '<@!749022439438287019>'){
        message.reply('My prefix is \`;\` just incase you forgot.')
    }
    if(!message.content.toLowerCase().startsWith(process.env.prefix)) return;
	const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	if(command){


        if(command.category === "developer" && message.author.id != 503471433415000079)
        {
            let noPermembed = new Discord.MessageEmbed()
            .setTitle("Oxygen U")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField("You Do Not Have The Permission To Do That!", "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.reply(noPermembed);
            return;
        }
        command.run(client, message, args)
        const logEmbed = new Discord.MessageEmbed()
        .setTitle("Oxygen U")
        .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
        .setColor("#00a9be")
        .addField("Args:",`'${args}'`)
        .addField(capitalizeFirstLetter(command.name.toString()),`${command.description}`)
        .setTimestamp()
        .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL());
        
        client.channels.cache.get('750704480433078352').send(logEmbed);
        return;
    }   
});


client.login(process.env.token);