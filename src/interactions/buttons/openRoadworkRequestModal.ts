import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export class OpenRoadworkRequestButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ['open_roadwork_request_modal']);
  }

  async execute(interaction: ButtonInteraction) {
    try {
      const modal = new ModalBuilder()
        .setCustomId('roadwork_request_modal')
        .setTitle('Submit Roadwork Request');

      const locationInput = new TextInputBuilder()
        .setCustomId('location')
        .setLabel('Location')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('PO1112, Oak Valley Drive, Springfield')
        .setRequired(true);

      const descriptionInput = new TextInputBuilder()
        .setCustomId('description')
        .setLabel('Description')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Road closure to repair damage caused by severe weather.')
        .setRequired(true);

      const vehiclesInput = new TextInputBuilder()
        .setCustomId('vehicles')
        .setLabel('Vehicles Needed')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('1x Cone Truck\n1x Falcon Advance+ Roadside Assist\n3x Chevlon Platoro Utility')
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(locationInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(vehiclesInput)
      );

      await interaction.showModal(modal);
    } catch (error) {
      console.error('Error showing modal:', error);
    }
  }
}
