const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    if (message.author.id == 683703998729027769) return message.reply(await client.createEmbed('err', { title: 'Hmmm ...', description: `Você não pode usar esse comando.` }, message))

    function clean(text) {
      if (typeof (text) == "string"){
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      } else {
        return text;
      }
    }

    try {
      let code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled == "string") {
        evaled = require("util").inspect(evaled);
      }
      let data = {
        title: `Eval - ${client.user.name}`, 
        color: 'GREEN',
        fields: [
          { 
            name: 'Código de Saída', 
            value: `\`\`\`\n${clean(evaled)}\n\`\`\``
          }
        ]
      }

      message.channel.send(await client.createEmbed('success', data, message));
    } catch (err) {
      let data = {
        title: `Eval - ${client.user.name}`, 
        fields: [
          { 
            name: 'Código de Saída', 
            value: `\`\`\`\n${clean(err)}\n\`\`\``
          }
        ]
      }

      message.channel.send(await client.createEmbed('err', data, message));
    }
  },
  conf: {
    onlyguilds: false
  },
  get help() {
    return {
      name: "eval",
      category: "Utils",
      description: "....",
      usage: "eval [block-command]"
    };
  }
};