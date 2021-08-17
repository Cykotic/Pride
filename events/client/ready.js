const { prefix } = require("../../config.json")

module.exports = (client) => {
    console.log(`Connected to: [ ${client.user.tag} ] | PID: ${process.pid} | Total Commands: ${client.commands.size}`)
    client.user.setPresence({
        status: "dnd",
        activity: {
            name: `${prefix}help | ${client.users.cache.size} users`,
            type: 'WATCHING'
        }
    })
}