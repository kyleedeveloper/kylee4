const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('Yeni Bir Ticket Oluştur'),
    async execute(client, interaction) {
      let category = db.fetch(`parentCategory_${interaction.guildId}`);
    
      let Data = db.fetch(`ticketCount_${interaction.guildId}`)
      if(Data == null) Data = 0;
    
        await interaction.reply({ content: `Ticket Oluşturuluyor Lütfen Bekleyin...`, ephemeral: true })
        
          const ticket = await interaction.guild.channels.create(`ticket-${Data}-${interaction.user.username}`, {
            parent: category,
            permissionOverwrites: [
              {
                id: interaction.user.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
              },
              {
                id: interaction.guild.roles.everyone,
                deny: ['VIEW_CHANNEL'],
              },
            ],
            type: 'text',
          });
    
        db.add(`ticketCount_${interaction.guildId}`, 1)
        db.set(`ticket-${ticket.id}_${interaction.guild.id}`, {
          user: interaction.user.id,
          closed: false
        })
        await interaction.editReply({ content: `Ticket Oluşturuldu ${ticket}`, ephemeral: true })
    
    
        const welcomeTicket = new MessageEmbed()
        .setAuthor('Ticket Yardım', client.user.displayAvatarURL())
        .setDescription('Yardım Ekibi Hemen Geliyor.\nTicketi Kapatmak İçin Şuna Tıklayın 🔒')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        const closeButton = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('ticket-kapat')
          .setLabel('Kapat')
          .setEmoji('🔒')
          .setStyle('SECONDARY'),
        )
        const welcome = await client.channels.cache.get(ticket.id).send({ content: `${interaction.user} Welcome`, embeds: [welcomeTicket], components: [closeButton] })
    }
}