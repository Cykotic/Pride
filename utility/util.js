const djs = require('discord.js'); const mysql = require('mysql'); // eslint-disable-line

module.exports = {
	/**
	 * Confirms a question.
	 * @param {djs.DMChannel} channel The channel to confirm in
	 * @param {string|djs.MessageEmbed|djs.MessageOptions} question The question to ask
	 * @param {string[]} emojis The confirm and deny emojis
	 * @returns {Promise<boolean>} If the user has confirmed or not-confirmed
	 */
	async confirm(channel, question, { emojis = ['✅', '❌'], time = 60_000 } = {}) {
		try {
			const message = await channel.send(question);
			for (const emoji of emojis) {
				await message.react(emoji);
			}
			const response = (await message.awaitReactions((reaction, user) => !user.bot, {
				errors: ['time'],
				max: 1,
				time
			})).first();
			return (response.emoji.name || response.emoji.id) === emojis[0];
		} catch (reason) {
			if (typeof reason === 'string') return false;
			throw reason;
		}
	},
	/**
 	 * Query the database.
 	 * @param {mysql.Connection} sql The database
 	 * @param {string} query SQL query string
 	 * @param {...any} args arguments for SQL
 	 * @returns {Promise<{ [key: string]: string | number}[]>} The results
 	 */
     qSQL(sql, query, ...args) {
		return new Promise((resolve, reject) => {
			sql.query(query, args, (error, results) => {
				if (error) reject(error);
				else resolve(results);
			});
		});
	},
	/**
	 * Generates a random string.
	 * @param {number} length Length of the random string
	 * @param {string} charset Characters to choose from
	 * @returns {string} The string that was generated
	 */
	randomString(length, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
		let str = '';
		const count = charset.length;
		while (length--) {
			str += charset[Math.floor(Math.random() * count)];
		}
		return str;
	}
};


//:white_check_mark: :x: