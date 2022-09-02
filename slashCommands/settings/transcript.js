const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transcript-ayarla')
        .setDescription('Transcriptin Atılacağı Kanalı Seç')
        .addChannelOption(channel =>
          channel.setName('channel').setDescription('Transcript Kanalı')
        )
        .addStringOption(type =>
          type.setName('transcript-türü').setDescription('html ya da yazı transcripti')
          .addChoice('html', 'html').addChoice('yazı', 'yazı')
        ),
    async execute(client, interaction) {
      const channel = interaction.options.getChannel('channel');
      const type = interaction.options.getString('transcript-türü');

      let channelEmbed = new MessageEmbed()
      .setAuthor('Ticket >> Ticket Transcript Ayarları', interaction.guild.iconURL())
      .setDescription(`${interaction.user}, Başarıyla Transcript Atılacağı Kanal Ayarlandı ${channel} ve Transcript Türü İse ${type}`)
      db.set(`ticketTranscript_${interaction.guild.id}`, channel.id)
      db.set(`transcriptType_${interaction.guild.id}`, type)
      interaction.reply({ embeds: [channelEmbed] })
    }
}