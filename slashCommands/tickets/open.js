const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-ac')
        .setDescription('Ticketi Açar'),
    async execute(client, interaction) {
      let closed = await db.fetch(`ticket-${interaction.channel.id}_${interaction.guild.id}`)
  
      if(closed.closed == false) {
        return interaction.reply({ content: `Ticket Zaten Açıldı...`, ephemeral: true })
      }
      let reopen = new MessageEmbed()
      .setDescription(`Ticket ${interaction.user} Tarafından Açıldı`)
      interaction.reply({ embeds: [reopen] })
      interaction.channel.permissionOverwrites.edit(closed.user, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          ATTACH_FILES: true,
          READ_MESSAGE_HISTORY: true,
      });
      db.set(`ticket-${interaction.channel.id}_${interaction.guild.id}.kapandı`, false)
    }
}