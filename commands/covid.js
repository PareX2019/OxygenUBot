const Discord =  require("discord.js");
const api = require('covidapi');
const { ftruncateSync } = require("fs");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


module.exports = {
    name: 'covid',
    description : "returns covid stats acording to arg",
    execute(message, args, data,dataALL){
    
        if(!args.length){
            const countryembedALL = new Discord.MessageEmbed()
            .setColor('#00a9be')
            .setAuthor(`Global Cases|You Didnt Specify A Country So Here's Global Info.`,'https://cdn.discordapp.com/attachments/687759005417996401/744610209892139098/unknown.png')
            .setFooter("If it says 'undefined' it means you either typed something wrong or my database doesnt have that country| Made By PareX|Beta")
            .addField("Total Cases",dataALL.cases,true)
            .addField("Deaths", dataALL.deaths,true)
            .addField("Recovered", dataALL.recovered, true)
            .addField("Active Cases", dataALL.active,true)
            .addField("Critical Cases", dataALL.critical,true)
            .setTimestamp()
            .addField("Cases Today", dataALL.todayCases, true);
    
            message.channel.send(countryembedALL);
        }
        else
        {
            const countryembed = new Discord.MessageEmbed()
    
            .setColor('#00a9be')
            .setAuthor(`${capitalizeFirstLetter(args.toString())} Cases`,'https://cdn.discordapp.com/attachments/687759005417996401/744610209892139098/unknown.png')
            .setFooter("If it says 'undefined' it means you either typed something wrong or my database doesnt have that country| Made By PareX|Beta")
            .addField("Total Cases",data.cases,true)
            .addField("Deaths", data.deaths,true)
            .addField("Recovered", data.recovered, true)
            .addField("Active Cases", data.active,true)
            .addField("Critical Cases", data.critical,true)
            .setTimestamp()
            .addField("Cases Today", data.todayCases, true);
            message.channel.send(countryembed);  

        }
    }
}