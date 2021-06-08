const Discord = require('discord.js');

module.exports = (client) => {
  client.createEmbed = async (type, data, message) => {
    const { author, title, thumbnail, color, description, fields, image, footer } = data;
    const embed = new Discord.MessageEmbed()
    
    switch (type.toLowerCase()) {
      case 'err':
        if (typeof author == 'object') {
          if (author.name) embed.setAuthor(author.name);
          if (author.name) embed.setAuthor(author.image);
          if (author.name) embed.setAuthor(author.link);
        } else {
          if (author) embed.setAuthor(author);
        }

        if (title) embed.setTitle(`Err:`, title);
        if (thumbnail) embed.setThumbnail(thumbnail);

        embed.setColor('RED');

        if (description) embed.setDescription(description);
        if (fields) embed.addFields(fields);
        if (image) embed.setImage(image);

        if (footer) embed.setFooter(footer);
        else embed.setFooter(`Executado por ${message.author.username} (${message.author.id})`);

        embed.setTimestamp();

        return await embed;
      case 'success':
        if (typeof author == 'object') {
          if (author.name) embed.setAuthor(author.name);
          if (author.name) embed.setAuthor(author.image);
          if (author.name) embed.setAuthor(author.link);
        } else {
          if (author) embed.setAuthor(author);
        }

        if (title) embed.setTitle(title);
        if (thumbnail) embed.setThumbnail(thumbnail);
        if (color) embed.setColor(color);
        if (description) embed.setDescription(description);
        if (fields) embed.addFields(fields);
        if (image) embed.setImage(image);

        if (footer) embed.setFooter(footer);
        else embed.setFooter(`Executado por ${message.author.username} (${message.author.id})`);

        embed.setTimestamp();

        return await embed;
    }
  }
}