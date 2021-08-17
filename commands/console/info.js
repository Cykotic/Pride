const { qSQL } = require('../../utility/util');
const { ms } = require('@naval-base/ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "info",
    category: "<:xbox:876732358047436830> | console",
    run: async ({ client, message, args, sql }) => {

        await message.delete();

        const [data] = await qSQL(sql, 'SELECT * FROM guestmode WHERE discord = ?', message.author.id);
        if (!data) return message.channel.send({
            embed: {
                description: "Error | ❌ You don't seem to be linked, you can do this by using the `link` command",
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        return message.channel.send(new MessageEmbed()

            .addField(`Xbox Information:`, [
                `> ❯ Username: **${data.Username}**`,
                `> ❯ Time Unbanned: **${data.KVTime}**`,
                `> ❯ KV Days: **${data.KVDays}**`,

            ])
            .addField("Xbox Time:", [
                `> ❯ Time Remaining: **${data.ExpireDate < Date.now() ? 'Waiting for new day' : ms(new Date(data.ExpireDate).getTime() - Date.now(), true)}**`,
                `> ❯ Reserve Days: **${data.DaysLeft > 500 ? 'Lifetime' : data.DaysLeft}**`,
            ])
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(0xFCFF33)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        )
    }
}