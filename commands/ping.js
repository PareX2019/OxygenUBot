const Discord =  require("discord.js");

module.exports = {
    name: 'ping',
    description : "returns ping.",
    execute(message, args){
        message.channel.send('pong');
    }
}