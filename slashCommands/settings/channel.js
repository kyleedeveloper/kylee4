const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kanala-gonder')
        .setDescription('Ticket Panelinin Atılacağı Kanalı Seç')
        .addChannelOption(channel =>
          channel.setName('channel').setDescription('Ticket Panel Kanalı')
        ),
    async execute(client, interaction) {
      let channel = interaction.options.getChannel('channel')

      let channelEmbed = new MessageEmbed()
      .setAuthor('Ticket >> Ticket Panel Kanalı', interaction.guild.iconURL())
      .setDescription(`${interaction.user}, Başarıyla Ticket Panelinin Atılacağı Kanal Ayarlandı ${channel}`)
      db.set(`ticketPanel_${interaction.guild.id}`, channel.id)
      interaction.reply({ embeds: [channelEmbed] })
    }
}