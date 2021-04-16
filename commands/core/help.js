const Discord = require("discord.js")


module.exports = {
    name: 'help',
    aliases: ["h", "cmd", "command"],
    category: ['core'],
    utilisation: '{prefix}help',


    async execute(client, message, args) {

        if (!args[0]) {


            const infos = message.client.commands.filter(x => x.category == 'info').map((x) => '`' + x.name + '`').join(', ');
            const config = message.client.commands.filter(x => x.category == 'config').map((x) => '`' + x.name + '`').join(', ');
            const core = message.client.commands.filter(x => x.category == 'core').map((x) => '`' + x.name + '`').join(', ');

            const embed = new Discord.MessageEmbed()
                .setAuthor('Help Panel')
                .setColor('BLACK')
                .setDescription(`[Support Server](https://discord.gg/RNXU4mXQnv) | [Invite me](https://discord.com/api/oauth2/authorize?client_id=832379973804359690&permissions=8&scope=bot)`)
                .addFields({
                    name: 'Core',
                    value: `${core}`,
                    inline: true
                }, {
                    name: 'Infos',
                    value: `${infos}`,
                    incline: true
                }, {
                    name: 'Config',
                    value: `${config}`,
                    incline: true
                })
                .setFooter(`For more info please do !help <command>`)

            message.channel.send(embed)
        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.channel.send(`:warning: | I did not find this command`);

            message.channel.send({
                embed: {
                    color: 'BLACK',
                    author: {
                        name: 'Help pannel'
                    },

                    fields: [{
                            name: 'Name',
                            value: command.name,
                            inline: true
                        },
                        {
                            name: 'Category',
                            value: command.category,
                            inline: true
                        },
                        {
                            name: 'Aliase(s)',
                            value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '),
                            inline: true
                        },
                        {
                            name: 'Utilisation',
                            value: command.utilisation.replace('{prefix}', "!"),
                            inline: true
                        },
                    ],
                    timestamp: new Date(),
                    description: 'Find information on the command provided',
                }
            });
        };
    }
}