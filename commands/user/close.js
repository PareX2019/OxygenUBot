const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "close",
    category: "user",
    description: "Closes The Ticket Its Written In",
    run: async (client, message, args) => {
            if(message.channel.name.toString().includes("ticket"))
            {
                let yesNo = new Discord.MessageEmbed()
           .setTitle("Oxygen U")
           .setDescription("React With ✅ To Verify To Deleting This Channel, React With 🚫 To Keep This Channel")
            message.channel.send(yesNo).then(msg =>{
               msg.react("✅")
               msg.react("🚫")
           });
           return;
            }
            else{
                await message.delete();
                message.author.send("You Can Only Use This Command In A Ticket!");
            }
    }
}