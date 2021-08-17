const { qSQL } = require('../../utility/util');

module.exports = {
    name: "name",
    category: "<:xbox:876732358047436830> | console",
    run: async ({ client, message, args, sql }) => {

        await message.delete()

        const [data] = await qSQL(sql, 'SELECT * FROM guestmode WHERE discord = ?', message.author.id);
        if (!data) return message.channel.send({
            embed: {
                description: "**Error | ❌ You don't seem to be linked, you can do this by using the `link` command**",
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        const name = message.content.split(" ").slice(1).join(' ');
        if (!name) return message.channel.send({
            embed: {
                description: `**Your current console name is ${data.Username}**`,
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        if (name.length > 20) return message.channel.send({
            embed: {
                description: '**Error | ❌ Your console name must be under 20 characters**',
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        const [existing] = await qSQL(sql, 'SELECT * FROM guestmode WHERE Username = ?', name);
        if (existing) return message.channel.send({
            embed: {
                description: '**Error | ❌ Sorry, that name is already taken**',
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        await qSQL(sql, 'UPDATE guestmode SET Username = ? WHERE discord = ?', name, message.author.id)

        return message.channel.send({
            embed: {
                description: '<:check:876739640722337822> | Your console name has been updated!',
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
    }
}