const Discord = require('discord.js');
const http = require('axios');
const { isBuffer } = require('util');
const usedRecently = new Set();


module.exports = {
    name: "genkey",
    category: "utility",
    description: "Generates An Oxygen U Key",
    usage: ";genkey",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
       
if(message.member.permissions.has("VIEW_AUDIT_LOG") || message.member.roles.cache.find(r => r.name === "Server Booster")){
    if (usedRecently.has(message.author.id)) {
        message.author.send("Wait before trying to use this again :x:");
        message.delete();
} else {
    http.get('https://oxygenu.xyz/KeySystem/GenKey.php?WRUIGUORDUOGHIOUER9GOIFREOIUHGOIUREOIUOU9HG9ORUEHGO9UHOU=1')
    .then(response => {
    let bbig = response.data.toString();
    const EmbedYes = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle(`Oxygen U | Gen Key`)
    .setDescription('This Key Should Last About 6 Hours, Each User Has An 1h Cooldown to using this command.')
    .addField('Key', `\`${bbig}\``)
    .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
    message.delete();
   message.author.send(EmbedYes);
    })
    .catch(error => {
      console.log(error);
    });
        
    usedRecently.add(message.author.id);
    setTimeout(() => {
      usedRecently.delete(message.author.id);
    }, 6000000);
}
}else{
   message.author.send('You Do Not Have Permission To Run This Command :x:');
   message.delete(); 
}
}


      
}