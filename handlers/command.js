const ascii = require("ascii-table");
const fs = require("fs");

module.exports = (client) => {
    let table = new ascii("Commands");
    table.setHeading("Category", "Command", "Load Status");
    fs.readdirSync("./commands/").forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for(let file of commands){
            let o = new Date().getTime();
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name && pull.category){
                let nm = pull.name.charAt(0).toUpperCase() + pull.name.slice(1);
                let cat = pull.category.charAt(0).toUpperCase() + pull.category.slice(1);
                client.commands.set(pull.name, pull);
                table.addRow(cat, nm, `✅ (${new Date().getTime() - o}ms)`);
            } else {
                table.addRow("N/A", file, "❌ (Missing name/category)");
                continue;
            }
            if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    })
    console.log(table.toString());
}