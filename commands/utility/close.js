const Discord = require('discord.js');
const command = require('../../handlers/command');

module.exports = {
    name: "close",
    category: "utility",
    description: "Closes The Ticket Its Written In",
    usage: ";close",
    permission: "SEND_MESSAGES",
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
            }
            else{
                await message.delete();
                message.author.send("You Can Only Use This Command In A Ticket!");
            }
    }
}