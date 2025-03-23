import { Modal } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ModalSubmitInteraction, EmbedBuilder, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildMember } from 'discord.js';

export class RoadworkRequestModal extends Modal {
    constructor(client: ShewenyClient) {
    super(client, ['roadwork_request_modal']);
  }

  async execute(interaction: ModalSubmitInteraction) {
    try {
      const location = interaction.fields.getTextInputValue('location');
      const description = interaction.fields.getTextInputValue('description');
      const vehicles = interaction.fields.getTextInputValue('vehicles');

      const requestEmbed = new EmbedBuilder()
        .setTitle('New Roadwork Request')
        .setDescription(`Requested by **${(interaction.member as GuildMember)?.displayName || interaction.user.username}**`)
        .addFields(
          { name: 'Location', value: location },
          { name: 'Description', value: description },
          { name: 'Vehicles Needed', value: vehicles }
        )
        .setColor('#1D4A88')
        .setTimestamp()

      const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`accept_roadwork_${interaction.user.id}`)
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(`deny_roadwork_${interaction.user.id}`)
            .setLabel('Deny')
            .setStyle(ButtonStyle.Danger)
        );

      const reportChannel = await this.client.channels.fetch('1226685758740365312'); // report channel: #accept-rws
      if (reportChannel instanceof TextChannel) {
        await reportChannel.send({ 
          embeds: [requestEmbed],
          components: [buttons]
        });
      }

      await interaction.reply({
        content: 'Your roadwork request has been successfully submitted! A supervisor will review it shortly.',
        ephemeral: true
      });

    } catch (error) {
      console.error('Error in roadwork request modal:', error);
      await interaction.reply({
        content: 'An error occurred while submitting your request.',
        ephemeral: true
      });
    }
  }
}
