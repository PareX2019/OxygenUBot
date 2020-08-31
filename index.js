const Discord =  require("discord.js");
const Bot = new Discord.Client();
const api = require('covidapi');

const fs = require("fs");

Bot.commands = new Discord.Collection();
const talkedRecently = new Set();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    Bot.commands.set(command.name, command);
}

Bot.once('ready', () => {
    console.log(`${Bot.user.username} is now Running.`);
});

Bot.on('message' , async message =>{

    if(message.author.bot)
    {
        return;
    }

    const args = message.content.slice(process.env.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const data = await api.countries({country: args});
    const dataALL = await api.all();

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

    if(!message.content.startsWith(process.env.prefix) || message.author.bot) return;
    
    if(command === 'ping'){
        Bot.commands.get('ping').execute(message, args);
    }
    else if(command === 'download'){
        Bot.commands.get('download').execute(message, args);
    }
    else if(command === 'covid'){
        Bot.commands.get('covid').execute(message,args,data,dataALL);
    }
    else if(command === 'oxy_api'){
        Bot.commands.get('oxy_api').execute(message,args);
    }
    else if(command === 'log_commands'){
        if(message.author.id === '503471433415000079'){
    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
      commandFiles.forEach(command2 =>{
       const big = command2.replace(".js"," ");
       console.log(big);
      });
        }
        else{
            return;
        }
    }
});


Bot.login(process.env.token);