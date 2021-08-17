const { db, prefix } = require("../../config.json");
const sql = require('mysql');

const con = sql.createConnection({
  database: db.database,
  host: db.host,
  password: '',
  user: db.username
})

con.connect((err) => {
  if (err) {
    console.log('Error connecting to db' + err.stack);
    return;
  }
  console.log('SQL has successfully connected!');
});

module.exports = async (client, message) => {

    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.members.fetch(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;

    // part of the prefix command 
    if (command) command.run({ client, message, args, sql: con })
    
  }
