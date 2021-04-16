const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [],
    category: 'info',
    utilisation: '{prefix}ping',

    async execute(client, message, args) {

        const msg = await message.channel.send("Pinging...")

        const apiLatency = Math.round(client.ws.ping)
        const botLatency = msg.createdTimestamp - message.createdTimestamp

        const pingEmbed = new Discord.MessageEmbed()
        await msg.delete().then(pingEmbed.setTitle(`API latency is **${apiLatency}ms** | Bot latency is **${botLatency}ms**`))

        if (botLatency < 100) {
            pingEmbed.setColor("GREEN")
        } else if (botLatency < 270) {
            pingEmbed.setColor("YELLOW")
        } else if (botLatency > 269) {
            pingEmbed.setColor("RED")
        }

        message.channel.send(pingEmbed)
    },
};