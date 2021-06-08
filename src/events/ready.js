const chalk = require('chalk');

const pkg = require('../../package.json');

module.exports = async (client) => {
  console.log('')
  console.log(`[ ${chalk.green('OK')} ] O bot foi iniciado.\n
       ${client.users.cache.size} users\n
       ${client.guilds.cache.size} servers\n
       ${client.channels.cache.size} channels\n
  `);
  console.log(`${client.user.username}: Yeey!`)
  console.log('');

   /*
    * PLAYING → Jogando.
    * STREAMING → !
    * LISTENING → Ouvindo.
    * WATCHING → Assistindo.
    */

  let status = [
    //{ name: `Mencione para ver o meu prefixo.`, type: 'PLAYING' },
    { name: `${client.users.cache.size} humanos em ${client.guilds.cache.size} servidores.`, type: 'LISTENING' },
    { name: `Atualmente estou na V. ${pkg.version}`, type: 'WATCHING' }
  ]

  function setStatus(){
    let randomStatus = status[Math.floor(Math.random()*status.length)]    

    client.user.setPresence({ activity: randomStatus, status: 'dnd' })
  }

  setStatus();
  
  setInterval(() => {
		setStatus();
	}, 15000);
}