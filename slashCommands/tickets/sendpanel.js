const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel-gonder')
        .setDescription('Ticket Paneli Gönderir.'),
    async execute(client, interaction) {
          let channel = db.get(`ticketPanel_${interaction.guild.id}`);
          let category = db.get(`parentCategory_${interaction.guild.id}`);

          let replyEmbed = new MessageEmbed()
          .setAuthor('Ticket >> Ticket Panel Gönderildi!', interaction.guild.iconURL())
          .setDescription(`${interaction.user}, ticket Paneli Şuraya Atıldı <#${channel}>`)
          interaction.reply({ embeds: [replyEmbed] })

          const embed = new MessageEmbed()
          .setAuthor('Ticket', client.user.displayAvatarURL())
          .setDescription('Butona Basıp Ticket Açabilirsin.')
          .setFooter(client.user.username, client.user.displayAvatarURL())
           const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('ticket-oluştur')
            .setLabel('Ticket Oluştur.')
            .setEmoji('📩')
            .setStyle('PRIMARY'),
          )
          const message = await client.channels.cache.get(channel).send({ embeds: [embed], components: [row] })
    }
}