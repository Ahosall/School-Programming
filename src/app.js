console.time()
if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

require('dotenv').config();

const Discord = require('discord.js');
const Enmap = require('enmap');
const chalk = require('chalk');

const { readdirSync } = require('fs');
const { join } = require('path');

const client = new Discord.Client({
  disableMentions: 'everyone',
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Enmap();
client.aliases = new Enmap();

client.startTime = Date.now();

require('./utils/functions.js')(client);

console.log('Iniciando ...\n')

// Load Commands
console.log('Carregando comandos ...\n')

readdirSync(join(__dirname, "commands")).forEach(dir => { 
  const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));

  commands.forEach(f => {
    try {
      const props = require(`./commands/${dir}/${f}`)

      if (props.init) props.init(client)
      
      if (props.help.aliases) {
        props.alias = true;
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
          client.aliases.set(alias, props)
        });

        console.log(`[ ${chalk.green('OK')} ] ${dir} - ${props.help.name} [${props.help.aliases}]`);
      } else {
        client.commands.set(props.help.name, props)
        console.log(`[ ${chalk.green('OK')} ] ${dir} - ${props.help.name}`);
      }
      
      
    } catch (e) {
      console.log('Erro ao carregar o comando:', f.replace('.js', ''), '\n\nError: \n', e, '\n')
    }
  })
});

// Load events
console.log('\nCarregando eventos ...\n')

readdirSync('./src/events/').forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  try {
    client.on(eventName, event.bind(null, client));
    console.log(`[ ${chalk.green('OK')} ]`, eventName)
  } catch(err) {
    console.log('Erro ao carregar o evento:', f.replace('.js', ''), 'Error:', err)
  }
})
console.timeEnd()

client.login(process.env.AUTH)