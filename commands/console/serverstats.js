const { MessageEmbed } = require('discord.js');
const { qSQL } = require('../../utility/util');

module.exports = {
    name: "stats",
    category: "<:xbox:876732358047436830> | console",
    run: async ({ client, message, args, sql }) => {

        await message.delete()

        const niggeers = await qSQL(sql, 'SELECT * FROM guestmode');
        const [{ freemode }] = await qSQL(sql, 'SELECT Freemode FROM modulesettings')

        if (!niggeers.length) return message.channel.send({
            embed: {
                description: "something went wrong",
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        return message.channel.send(new MessageEmbed()
            .addField("Xbox Server Stats!", [
                `> ❯ All Consoles: **${niggeers.length}**`,
                `> ❯ Total Lifetime Consoles: **${niggeers.filter(data => data.DaysLeft > 500).length}**`,
                `> ❯ Total Online: **${niggeers.filter(data => data.DaysLeft > 500).length}**`,
                `> ❯ Total Reserve Days: **${niggeers.reduce((acc, next) => next.DaysLeft > 500 ? acc : acc + Number(next.DaysLeft), 0)}**`,
                `> ❯ Freemode: **${freemode ? 'Yes' : 'No'}**`,
            ])

            .setThumbnail(client.user.displayAvatarURL())
            .setColor(0xFCFF33)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        )
    }
}