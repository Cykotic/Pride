const { token } = require("./config.json");
const { Client, Collection } = require('discord.js');
const { color } = require('colors')
const client = new Client({
  disableMentions: "everyone",
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES', "GUILD_VOICE_STATES"] } 
});


// client.on('debug', console.log);

/** collection **/
client.commands = new Collection();
client.aliases = new Collection();

/** handlers **/
["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client); 
});

client.login(token);


/**
 * credit to jinx as i wouldn't have figured out how to make this project if it wasen't for him teaching me sql <3
 */