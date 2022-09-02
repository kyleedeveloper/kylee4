const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket-info')
		.setDescription('Ticket Hakkında Yardım.'),
	async execute(client, interaction) {
      let embed = new MessageEmbed()
      .setTitle(`${client.user.username} Ticket Yardım Sayfası`)
      .setDescription(`Botun Ticket Komutlarını Gösterir.\n\n**Ticket Komutları**\n\`ticket yardım\`\nTicket Yardım Sayfasını Gösterir.\n\n\`ping\`\nBotun Pingini Ölçer.\n\n\n**Slaş Komutları**\n\`ping\`\nBotun Pingini Ölçer.\n\n\`kategori\`\nTicketin Açılacağı Kanalı Ayarlar\n\n\`kanala-gonder\`\nTicket Panelini Atılacağı Kanalı Ayarlar\n\n\`transcript-ayarla\`\nTranscripti ve Transcript Türünün Atılacağı Kanalı Ayarlar\n\n\`panel-gonder\`\nTicketin Panelini Atar\n\n\`Ticket\`\nTicket Oluşturur\n\n\`Kapat\`\nTicketi Kapatır\n\n\`Ticketi-aç\`\nTicketi Açar.\n\n\`kapat\`\nTicketi Kapatır.\n\n\`transcript\`\nTicketin Transcriptini Atar `)
      .setFooter(`YusufiBOT Ticket Sistemi`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
      interaction.reply({ embeds: [embed] });
	}
};
