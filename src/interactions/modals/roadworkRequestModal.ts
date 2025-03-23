import { Modal } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ModalSubmitInteraction, EmbedBuilder, TextChannel } from 'discord.js';

export class RoadworkRequestModal extends Modal {
    constructor(client: ShewenyClient) {
    super(client, ['roadwork_request_modal']);
  }

  async execute(interaction: ModalSubmitInteraction) {
    const location = interaction.fields.getTextInputValue('location');
    const description = interaction.fields.getTextInputValue('description');

    const requestEmbed = new EmbedBuilder()
      .setTitle(`New Roadwork Request`)
      .setDescription(description)
      .setColor('#1D4A88')
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.tag}` });

    const reportChannel = await this.client.channels.fetch('1226685758740365312');
    if (reportChannel instanceof TextChannel) {
      await reportChannel.send({ embeds: [requestEmbed] });
    }

    await interaction.reply({
      content: '✅ Your roadwork request has been successfully submitted! A supervisor will review it shortly.',
      ephemeral: true
    });
  }
}
