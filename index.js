const Discord =  require("discord.js");
const Bot = new Discord.Client();
const api = require('covidapi');

const fs = require("fs");

const talkedRecently = new Set();

Bot.once('ready', () => {
    console.log(`${Bot.user.username} is now Running.`);
});

Bot.on('message' , async message =>{
    
        if(message.content.includes("help")||message.content.includes("Help")||message.content.includes("HELP")){
            if (talkedRecently.has(message.author.id)) {
                return;
        } else {
            if(message.channel.parentID === '710416628206010426'){
                const ChannelName = Bot.channels.cache.get("744650457506512896");
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
    if(message.author.bot) return;
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
    if(responding.includes('<@!749022439438287019>')){
        message.channel.send('My prefix is \`;\` just incase you forgot.')
    }
    if(!message.content.toLowerCase().startsWith(process.env.prefix)) return;
	const args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command = Bot.commands.get(cmd);
	if(!command) command = Bot.commands.get(Bot.aliases.get(cmd));
	if(command){
		if(command.category === "developer" && message.author.id != 503471433415000079) return;
		if(command.requiredRole && !message.member.roles.cache.some(role => role.name === command.requiredRole)) return;
		command.run(Bot, message, args);
	}
    
});


Bot.login(process.env.token);