const { qSQL } = require('../../utility/util');

module.exports = {
    name: "link",
    category: "<:xbox:876732358047436830> | console",
    run: async ({ client, message, args, sql }) => {

        await message.delete()

        // if the user is already exiting into the db
        const [existing] = await qSQL(sql, "SELECT * FROM guestmode WHERE discord = ?", message.author.id);
        if (existing) return message.channel.send({
            embed: {
                description: "**Error | ❌ You're already linked!**",
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        // if the user is not connect, it'll send a error message
        const cpukey = (args[0] || '').toUpperCase();
        if (!cpukey || cpukey.length !== 32) {
            return message.channel.send({
                embed: {
                    description: "Error | ❌ That's not a valid **CPUKey**, a **CPUKey** is 32 characters long and looks something like `1234ABCD5678EFGH9012IJKL34546MNO`",
                    color: 0xFCFF33
                }
            }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
        }

        // if the user not connect to the server
        const [dataSQL] = await qSQL(sql, "SELECT * FROM guestmode WHERE discord = ?", cpukey);
        if (!dataSQL) return message.channel.send({
            embed: {
                description: "**Error | ❌ You don't seem to have console connected to the server!, please connected to the server and try again!**",
                color: 0xFCFF33
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))

        // if the cpukey doesn't belong to the useri
        if (!dataSQL.discord) {
            try {
                const user = await this.client.users.fetch(data.discord);
                console.log(`${message.author.tag} (${message.author.id}) Tried to link to ${cpukey}, which doesn't belong to them, it belongs to ${user.tag} (${user.id})`);
            }
            catch (err) {
                if (err.message !== "Error | ❌ Please Enabled DMs and Try Again!") {
                    console.log([
                        `${message.author.tag} (${message.author.id}) Tried to link to ${cpukey}, which doesn't belong to them`,
                        `it belongs to ${data.discord}`
                    ].join('\n'));
                }
            }
            return message.channel.send({
                embed: {
                    description: "**Error | ❌ That **CPUKey** doesn't belong to you!**",
                    color: 0xFCFF33,
                }
            }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
        }

        await qSQL(sql, "UPDATE guestmode SET discord = ? WHERE CPUKey = ?", message.author.id, cpukey);
        return message.channel.send({
            embed: {
                description: "<:check:876739640722337822> | You are now linked!",
                color: 0xFCFF33,
            }
        }).then(msg => msg.delete({ timeout: 20000 }).catch(e => console.log(e.message)))
    }
};