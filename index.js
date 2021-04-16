const Discord = require('discord.js');
const client = new Discord.Client({
    disableMention: 'everyone',
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION", "USER"],
});


const fs = require('fs')

client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});


const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};


client.login(process.env.TOKEN)
