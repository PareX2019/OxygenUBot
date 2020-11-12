const Discord = require('discord.js');
const fs = require('fs');
const command = require('../../handlers/command');
const { join, dirname } = require('path');
const config = require('../../config.json');

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = {
    name: "help",
    category: "user",
    description: "Show All The Commands",
    usage: ";help [category(optional)] [command(optional)]",
    permission: "SEND_MESSAGES",
    run: async (client, message, args) => {
                if(!args[0]){
                    let userEmbed = new Discord.MessageEmbed()
                    .setTitle("Info And Help")
                    .setColor('RANDOM')
                    .setFooter(`Run By ${message.author.tag}`, message.author.avatarURL());
                    fs.readdirSync(join(__dirname, '..')).forEach(dir => {
                            userEmbed.addField(`${capitalizeFirstLetter(dir.toString())}`,`\`;help ${dir}\``,true)
                    })
                    message.channel.send(userEmbed);
                }
                else if(args[0]){
                   let bb = fs.readdirSync(join(__dirname, '..'));//array of categories
                   let aa = new Array();//array of commands in every category14


                    fs.readdirSync(join(__dirname, '..')).forEach(dir => {
                        const commands = fs.readdirSync(join(__dirname, `../${dir}`)).filter(file => file.endsWith(".js"));
                        for(let file of commands){
                        let cmd = require(join(__dirname, `../${dir}/${file}`))
                        aa.push(cmd.name);
                        }
                    })


                    if(bb.includes(args[0].toString())){//checks if args are in the array of commands sub folders

                        let nameA = args[0].toString();
                        let Arr = new Array();
                        let embedBig2 = new Discord.MessageEmbed()
                        .setTitle(`${capitalizeFirstLetter(nameA.toString())} Commands`)
                        .setColor('RANDOM')
                        
                        .setFooter(`Run By ${message.author.tag}`, message.author.avatarURL());
                        const commands = fs.readdirSync(join(__dirname, `../${nameA}`)).filter(file => file.endsWith(".js"));
                        for(let file of commands){
                        let cmd = require(join(__dirname, `../${nameA}/${file}`))
                         embedBig2.addField(`\`;help ${cmd.name}\``,cmd.description);
                        }
                        return message.channel.send(embedBig2);

                    }
                    else if(aa.includes(args[0].toString())){
                          let cmdArgs = args[0].toString()

                          let aDF = new Discord.MessageEmbed()
                          .setColor("#00000")
                          .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
                          .setAuthor("Oxygen U", "https://cdn.discordapp.com/icons/763773951833800744/aa71b39acd2798437e765cdfd81dc5a0.png?size=4096")
                          fs.readdirSync(join(__dirname, '..')).forEach(dir => {
                            const commands = fs.readdirSync(join(__dirname ,'..' , dir.toString())).filter(file => file.endsWith(".js") && file.startsWith(cmdArgs));
                            for(let file of commands){
                                let cmd = require(join(__dirname, `../${dir}/${file}`))
                                let description = capitalizeFirstLetter(cmd.description.toString());
                                let nameShit = capitalizeFirstLetter(cmd.name.toString());
                                let cmdCategory = capitalizeFirstLetter(cmd.category.toString());
                                let cmdUsage = cmd.usage.toString();
                                let perm = cmd.permission.toString();
                                let a3 = "Yes, You Can";
                                if(message.member.permissions.has(perm)){
                                    if(cmd.category === "developer" && message.author.id != config.authorID){
                                        a3 = "No, You Cant";
                                    }
                                }
                                else{
                                    a3 = "No, You Cant";
                                }
                                aDF.setDescription(`Command Name: \`${nameShit}\``)
                            aDF.addField("Usage:",`\`${cmdUsage}\`` , true)
                            aDF.addField("Permissions Needed:", `\`${perm}\``, true)
                            aDF.addField("Can You Run This?", a3)
                            aDF.addField("Description:",description)
                            aDF.setTimestamp()
                            aDF.addField("Category:",`\`${cmdCategory}\``, true)
                            }
                        })
                          message.channel.send(aDF);                        
                    }
                    else{
                        let embed = new Discord.MessageEmbed()
                        .setTitle("Oxygen U")
                        .setDescription(':x: Topic/Command Does Not Exist')
                        .setColor('#FF0000')
                        .setFooter(`Run By ${message.author.tag}`, message.author.avatarURL());
                        return message.channel.send(embed);
                    }
                } 
    }
}