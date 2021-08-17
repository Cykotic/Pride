const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json")

module.exports = {
    name: "help",
    description: "Returns all Commands, or one specific Command information",
    usage: "[command], [aliases], [command <cmd>]",
    aliases: ["h", "cmds"],
    category: "<:utility:871068944457424896> | utility",

    run: async ({ client, message, args, sql }) => {
        if (args[0]) {
            const command = await client.commands.get(args[0]);

            await message.delete()
            if (!command) {
                return message.channel.send(new MessageEmbed()
                    .setColor(0xFCFF33) // discord invisable color code (0x2f3136)
                    .setTimestamp()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                    .setTitle(`❌ Error | Unknown Command: \`${args[0]}\``)
                ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            }

            const embed = new MessageEmbed()
                .addField(`Command Information: \`${command.name}\``, [
                    `Description: \`${command.description || 'No Command Description'}\``,
                    `Usage: \`${command.name + " " + command.usage || `No Command Usage`}\``,
                    `Aliases: \`${command.aliases.join("`, `")}\``,
                    `Cooldown: \`${command.cooldown || "No Cooldown"}\``,
                    `Permissions: \`${command.memberpermissions || "No Permissions, require for this command."}\``
                ])
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xFCFF33);
            return message.channel.send(embed);

        } else {
            const commands = await client.commands;

            let emx = new MessageEmbed()
                .setTitle('HELP MENU')
                .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example:  \`${prefix}help link\``,)
                .setColor(0xFCFF33)
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())

            let com = {}
            for (let comm of commands.array()) {
                let category = comm.category || "Unknown Category";
                let name = comm.name;

                if (!com[category]) {
                    com[category] = [];
                }
                com[category].push(name);
            }

            for (const [key, value] of Object.entries(com)) {
                let category = key;

                let desc = value.join(", ")

                emx.addField(` ${category.toUpperCase()} [${value.length}]`, `${desc}`, inline = false)
            }
            return message.channel.send(emx);

        }
    }
};