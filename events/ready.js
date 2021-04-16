const {
    connect
} = require('mongoose')
const config = require('../config.json')
const chalk = require('chalk')

const url = (process.env.MONGO)

module.exports = async (client) => {


    connect
        (url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }).then(console.log(chalk.red('MongoDB Connected')))

    console.log(chalk.yellow(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));

    setInterval(function() {

        let lol = ['c!help for Help!', `${client.channels.cache.size} Channels`, `${client.users.cache.size} Members | c!help `, `${client.guilds.cache.size} servers! | c!help`];

        let f = ['LISTENING', 'WATCHING', 'LISTENING', 'LISTENING', 'STREAMING'];

        let status = lol[Math.floor(Math.random() * lol.length)];

        client.user.setActivity(
            status, {
                type: f[Math.floor(Math.random() * f.length)]
            })

    }, 15000)

    client.user.setPresence({
        status: 'dnd'
    })

}