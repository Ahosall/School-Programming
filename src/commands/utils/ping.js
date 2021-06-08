const Discord = require('discord.js');

module.exports = {
  run: async (client, message) => {
    let data = {
      author: {
        name: client.user.name,
        image: client.user.displayAvatarURL({ dynamic: true, size: 2048 })
      },
      title: '🏓 Ping',
      thumbnail: client.user.displayAvatarURL({ dynamic: true, size: 2048 }),
      color: 'GREEN',
      fields: [
        { name: 'Latência', value: `${message.createdTimestamp - Date.now()}ms` },
        { name: 'Latência da API', value: `${Math.round(client.ws.ping)}ms` }
      ]
    }
    
    let embed = await client.createEmbed('Success', data, message);
    
    message.channel.send(embed);
  },
  conf: {
    onlyguilds: false
  },
  get help() {
    return {
      name: "ping",
      category: "Utils",
      description: "Comando responsável por mostrar meu ping e o ping da API.",
      usage: "ping"
    };
  }
};