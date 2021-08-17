const { qSQL } = require('../../utility/util');

module.exports = {
    name: "freemode",
    category: "<:xbox:876732358047436830> | console",
    run: async ({ client, message, args, sql }) => {

        const [{ Freemode }] = await qSQL(sql,'SELECT Freemode FROM modulesettings');

		// 0 and 1 will act as false or true respectively ya
        return message.channel.send({ 
            embed: {
                description: `Meh, is currently in ${Freemode ? 'freemode' : 'paid mode'}`,
                color: 0xFCFF33
            }
        })
    },
};