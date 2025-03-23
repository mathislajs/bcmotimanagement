import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

export class OpenRoadworkRequestButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ['open_roadwork_request_modal']);
  }

  async execute(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId('roadwork_request_modal')
      .setTitle('Submit Roadwork Request');

    const locationInput = new TextInputBuilder()
      .setCustomId('location')
      .setLabel('Location')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const descriptionInput = new TextInputBuilder()
      .setCustomId('description')
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const vehiclesInput = new TextInputBuilder()
      .setCustomId('vehicles')
      .setLabel('Vehicles Needed')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const firstRow = new ActionRowBuilder<TextInputBuilder>().addComponents(locationInput);
    const secondRow = new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput);
    const thirdRow = new ActionRowBuilder<TextInputBuilder>().addComponents(vehiclesInput);
    modal.addComponents(firstRow, secondRow, thirdRow);

    await interaction.showModal(modal);
  }
}
