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

    if(message.author.bot || message.author.roles.find("710416627409223737")||message.author.roles.cache.has("710416627409223738")||message.author.roles.cache.has("741734635674927114")||message.author.roles.cache.has("710416627413549127")||message.author.roles.cache.has("710416627413549128")){
       return;
    }
    else
    {
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
    }
   

    const args = message.content.slice(process.env.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const data = await api.countries({country: args});
    const dataALL = await api.all();

    if(!message.content.startsWith(process.env.prefix) || message.author.bot) return;

    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    commandFiles.forEach(command2 =>{
     const big = command2.replace(".js"," ");//list of the commands

   //  if(command === big){
    //  Bot.commands.get().execute(message,args,dataALL,data);
   //  }
     console.log(big.description);
     
  })
});


Bot.login(process.env.token);