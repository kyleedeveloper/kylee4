const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-kategori')
        .setDescription('Ticketin Açılacağı Kanalı Ayarlama')
        .addChannelOption(category =>
          category.setName('category').setDescription('Ticket channels\' parent category')
        ),
    async execute(client, interaction) {
          let category = interaction.options.getChannel('category')

          let categoryEmbed = new MessageEmbed()
          .setAuthor('Ticket >> Ticket Kanalları\' Kategori', interaction.guild.iconURL())
          .setDescription(`${interaction.user}, Başarıyla Ticketın Açılacaı Kategori Ayarlandı${category}`)
          db.set(`parentCategory_${interaction.guild.id}`, category.id)
          interaction.reply({ embeds: [categoryEmbed] })
    }
}