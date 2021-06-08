const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client, message) => {
  if (message.author.bot || message.author.id == client.user.id) return;
	
	let prefix = process.env.PREFIX;
  
  if (message.content.indexOf(prefix) !== 0) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.aliases.get(command);

  if (!cmd) return;
  
  console.log(`[ ${chalk.yellow('LOG')} ] ${message.author.tag} (${message.author.id}) [${message.guild.id}] - ${cmd.help.name}`);

  if (cmd.conf.onlyguilds && !message.guild) return;

  cmd.run(client, message, args);
}