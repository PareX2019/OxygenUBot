const Discord = require("discord.js")
const client = new Discord.Client({partials: ["CHANNEL","REACTION","MESSAGE"]});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
require("./handlers/command.js")(client);
const config = require('./config.json');
const backup = require("discord-backup");
const beautify = require('beautify');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs').promises;
const dom = new JSDOM();
const document = dom.window.document;

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

client.once('ready', () => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let o = new Date().getTime();
    console.log('----------------------------------------------------------');
    console.log('Connected to Discord via the token successfully.✅');
    console.log(`Username: ${client.user.tag}`);
    console.log(`User ID: ${client.user.id}`);
    console.log(`Prefix: ${config.prefix}`);
    console.log(`Started At: ${year}-${month}-${date}|${hours}:${minutes}:${seconds}✅`)
    console.log(`Running on Discord API version ${Discord.version}✅`);
    console.log(`Done At ${new Date().getTime() - o}ms`)
    console.log('----------------------------------------------------------');

        client.user.setActivity("Over Oxygen U", { type: "WATCHING"});
});

client.on('message' , async message =>{
    if(!message.guild.id === config.guildID) return;
       if(message.author.bot) return;
    
    let inviteLinks = ["discord.gg","discord.com/invite","discordapp.com/invite","discord.io","discord.link","invite.gg"]
    let iploggerLinks = ["grabify.org","iplogger.com","grabify.link","iplogger.org","2no.co","iplogger.com","iplogger.ru","iplogger.ru","yip.su","yip.su","iplogger.co","iplogger.info","ipgrabber.ru<","ipgraber.ru","iplis.ru","02ip.ru","ezstat.ru"]
    if(!message.member.hasPermission("VIEW_AUDIT_LOG")){
        if(inviteLinks.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            return message.author.send('Server Invites Are Forbiden!')
        }
        if(iploggerLinks.some(word => message.content.toLowerCase().includes(word))) {
            await message.delete()
            return message.guild.members.cache.get(message.author.user.id).ban('Posting IP Loggers thanks to masterzz sexy auto mod they just got banned.(spoonfed me yes)')
        }
    }
    const responding = message.content.toLowerCase()
    if(responding === `<@!${client.user.id}>`){
        message.reply(`My prefix is \`${config.prefix}\` just incase you forgot.`)
    }
    if(!message.content.toLowerCase().startsWith(config.prefix)) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	if(command){


        if(command.category === "developer" && message.author.id != config.authorID)
        {
            let noPermembed = new Discord.MessageEmbed()
            .setTitle("Oxygen U")
            .setDescription(`Category Of Command **${capitalizeFirstLetter(command.category)}**`)
            .setColor("#FF000")
            .addField("You Do Not Have The Permission To Do That!", "\:x: Error!")
            .setTimestamp()
            .setFooter(message.author.username,message.author.avatarURL());
            message.author.send(noPermembed);
            return;
        }


        if(!message.member.permissions.has(command.permission.toString())){
            let noPermEmbed = new Discord.MessageEmbed()
            .setTitle("Oxygen U")
            .setDescription(":x:Missing Permissions!" + ` You Need ${command.permission.toString()} to use this command!`)
            .setColor("#00000")
            .setFooter(`Command Run By ${message.author.username}`,message.author.avatarURL())
            return message.reply(noPermEmbed).then(msg =>{
                msg.delete({timeout: 7000})
                message.delete({timeout: 7000})
             });
        }
        command.run(client, message, args)
    }
});


client.on("guildMemberAdd", async (member) =>{
     member.guild.channels.cache.find(c => c.name ==="welcome" && c.type=="text").send(`<@${member.id}> has just joined ${member.guild.name}. ✅`)
    let embed = new Discord.MessageEmbed()
    .setTitle("Oxygen U")
    .setDescription("Please Verify In The Verification Channel")
    .setColor("#00000")
    .setFooter(member.user.tag,member.user.avatarURL())
    await member.send(embed)
})

client.on('guildMemberRemove', async member =>{
    member.guild.channels.cache.find(c => c.name ==="bye" && c.type=="text").send(`${member.displayName.toString()} has just left ${member.guild.name}. ❌`)
})

client.on('messageReactionAdd', async (reaction,user) =>{
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch();
    if(user.bot) return;

    let channel2 = reaction.message.guild.channels.cache.find(channel => channel.name === "verify" && channel.type === 'text').id.toString()
    if(reaction.emoji.name === "👍" && reaction.message.channel.id === channel2){

        reaction.users.remove(user)
        const role = reaction.message.guild.roles.cache.find(r=> r.name === "Members");
        const guild = reaction.message.guild;
        const memberWhoReacted = guild.members.cache.find(member => member.id === user.id);
        await memberWhoReacted.roles.add(role.id)
        let embed  = new Discord.MessageEmbed()
        .setTitle("Oxygen U ")
        .setDescription("You Have Been Verified!")
        .setColor("#00000")
        .setFooter(user.tag,user.avatarURL());
        user.send(embed);
        return;
    }

       const supID = client.channels.cache.find(channel => channel.name === "support-system" && channel.type == 'text').id.toString();



           if(reaction.message.channel.id === supID && reaction.emoji.name == '🎫'){
               let channelName = `ticket-${user.username.toLocaleLowerCase()}`;
           if(client.channels.cache.find(channel => channel.name === channelName && channel.type == 'text')) return user.send("You Already Have Created A Ticket!");

            reaction.users.remove(user);

            const role = reaction.message.guild.roles.cache.find(r=> r.name === "Support");

            let category = reaction.message.guild.channels.cache.find(BIG=> BIG.name === "Tickets");

            reaction.message.guild.channels.create(`ticket-${user.username}`, {
                permissionOverwrites: [
                    {
                        id: user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: reaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: role.id,
                        allow : ["SEND_MESSAGES", "VIEW_CHANNEL", "ATTACH_FILES", "EMBED_LINKS"]
                    }
                ],
                type: 'text',
                reason : `Ticket For ${user.tag}.`,
                parent : category.id
            }).then(async channel => {
            
                const role = reaction.message.guild.roles.cache.find(r=> r.name === "Support");
                let embed = new Discord.MessageEmbed()
                .setTitle("Welcome To Oxygen U's Support System.")
                .setTitle("Please Be Patient For Staff To Arive, React with :x: to close this ticket!")
                .setColor("00ff00")
                .addField("Format:", `\`\`\`\n${beautify(" OS: (example: windows 10)\n" + 
        "AV: (AntiVirus Name)\n" +
       " Issue: (example: at downloading, at injecting)\n" +
        "Problem: (explain your problem here.)\n"
        , { format : "js"})}\`\`\``)
        .setFooter('Please Send A Format Like This Above.',"https://cdn.discordapp.com/attachments/751213468090368100/757935452887187556/a_8502a1f6d340ac0d6bcc0f2688f66343.png");
                channel.send(`<@${user.id}>,<@&${role.id}>`, embed)
                .then(em => {
                    em.react("❌")
                })
            })

            
        }
        if(reaction.emoji.name === "❌" && reaction.message.channel.name.toString().includes("ticket"))
        {
            reaction.users.remove(user.id);
           let yesNo = new Discord.MessageEmbed()
           .setTitle("Oxygen U")
           .setDescription("React With ✅ To Verify To Deleting This Channel, React With 🚫 To Keep This Channel")
           reaction.message.channel.send(yesNo).then(msg =>{
               msg.react("✅")
               msg.react("🚫")
           } );
        }
        if(reaction.emoji.name === "✅" && reaction.message.channel.name.toString().includes("ticket"))
        {
            let messageCollection = new Discord.Collection();
            let channelMessages = await reaction.message.channel.messages.fetch({
                limit: 100
            }).catch(err => console.log(err));
    
            messageCollection = messageCollection.concat(channelMessages);
    
            while(channelMessages.size === 100) {
                let lastMessageId = channelMessages.lastKey();
                channelMessages = await reaction.message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
                if(channelMessages)
                    messageCollection = messageCollection.concat(channelMessages);
            }
            let msgs = messageCollection.array().reverse();
            let data = await fs.readFile('./template.html', 'utf8').catch(err => console.log(err));
            if(data) {
                await fs.writeFile(`ticket-${user.username}-transcript.html`, data).catch(err => console.log(err));
                let guildElement = document.createElement('b');
                let guildText = document.createTextNode(reaction.message.guild.name);
                let guildImg = document.createElement('img');
                guildImg.setAttribute('src', reaction.message.guild.iconURL());
                guildImg.className = "serverIcon";
                guildImg.setAttribute('width', '150');
                guildElement.appendChild(guildImg);
                guildElement.appendChild(guildText);
                await fs.appendFile(`ticket-${user.username}-transcript.html`, guildElement.outerHTML).catch(err => console.log(err));
    
                msgs.forEach(async msg => {
                    let parentContainer = document.createElement("div");
                    parentContainer.className = "parent-container";
    
                    let avatarDiv = document.createElement("div");
                    avatarDiv.className = "avatar-container";
                    let img = document.createElement('img');
                    img.setAttribute('src', msg.author.avatarURL());
                    img.className = "avatar";
                    avatarDiv.appendChild(img);
    
                    parentContainer.appendChild(avatarDiv);
    
                    let messageContainer = document.createElement('div');
                    messageContainer.className = "message-container";
    
                    let nameElement = document.createElement("span");
                    let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " EST");
                    nameElement.appendChild(name);
                    messageContainer.append(nameElement);
    
                    if(msg.content.startsWith("```")) {
                        let m = msg.content.replace(/```/g, "");
                        let codeNode = document.createElement("code");
                        let textNode =  document.createTextNode(m);
                        codeNode.appendChild(textNode);
                        messageContainer.appendChild(codeNode);
                    }
                    else {
                        let msgNode = document.createElement('span');
                        let textNode = document.createTextNode(msg.content);
                        msgNode.append(textNode);
                        messageContainer.appendChild(msgNode);
                    }
                    parentContainer.appendChild(messageContainer);
                    await fs.appendFile(`ticket-${user.username}-transcript.html`, parentContainer.outerHTML).catch(err => console.log(err));
                });
        }
        let logs = new Discord.MessageEmbed()
        .setDescription(`Ticket For ${user.tag}`)
        .setTitle(`Oxygen U Ticket System| Closed Ticket`)
        .attachFiles(`./ticket-${user.username}-transcript.html`)
        
        .setColor("00a9be")
        reaction.message.guild.channels.cache.find(channel => channel.name === "support-logs").send(logs);
            await reaction.message.channel.delete();
           await fs.unlink(`./ticket-${user.username}-transcript.html`)
        }
        if(reaction.emoji.name === "🚫" && reaction.message.channel.name.toString().includes("ticket")){
          await reaction.message.delete();
        }
});

client.login(config.token);