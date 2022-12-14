const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const db = require('quick.db');
const discordTranscripts = require('discord-html-transcripts');
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-transcript')
        .setDescription('Ticket Transcriptini Gönderir'),
    async execute(client, interaction) {
      const transcriptType = await db.fetch(`transcriptType_${interaction.guild.id}`);
      const transcriptChannel = await db.fetch(`ticketTranscript_${interaction.guild.id}`);
      if(transcriptType === 'html') {
      const attachment = await discordTranscripts.createTranscript(interaction.channel);
      await client.channels.cache.get(transcriptChannel).send({ content: `**Ticket Transcript - ${interaction.channel.name}**`, files: [attachment] });
          interaction.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`Ticket Transcripti Şuraya Atıldı <#${transcriptChannel}>!`)
          ] });
      } else if(transcriptType === 'text') {
          let messages = await interaction.channel.messages.fetch();
          messages = messages.map(m => moment(m.createdTimestamp).format("YYYY-MM-DD hh:mm:ss") +" | "+ m.author.tag + ": " + m.cleanContent).join("\n") || "No messages were in the ticket/Failed logging transcript!";
          const txt = new MessageAttachment(Buffer.from(messages), `transcript_${interaction.channel.id}.txt`)
         client.channels.cache.get(transcriptChannel).send({ content: `**Ticket Transcript - ${interaction.channel.name}**`, files: [txt] })
         interaction.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`Ticket Transcripti Şuraya Atıldı <#${transcriptChannel}>!`)
          ] });
      } else {
        return interaction.reply('Bu Sunucuda Transcript Yok!')
      }
    }
}