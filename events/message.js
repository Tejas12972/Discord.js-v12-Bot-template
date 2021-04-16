const config = require('../config.json')
const fetch = require('node-fetch')
require("../utils/ExtendedMessage.js");
const Schema = require('../utils/models/set-channel.js')
const prefix = require('../utils/models/set-prefix.js');
module.exports = async (client, message) => {


    if (message.author.bot || message.channel.type === 'dm') return;

   

    const data = await prefix.findOne({
        GuildID: message.guild.id
    });

    if (data) {
        const prefix = data.Prefix;

        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (cmd) cmd.execute(client, message, args);
    } else if (!data) {
        const prefix = "c!";

        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (cmd) cmd.execute(client, message, args);
    }

};