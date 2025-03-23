import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { CommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export class RoadworkRequestCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'roadworkrequest',
      description: 'Opens the roadwork request interface',
      type: 'SLASH_COMMAND',
    });
  }

  async execute(interaction: CommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('open_roadwork_request_modal')
          .setLabel('Submit roadwork request')
          .setStyle(ButtonStyle.Secondary)
      );

    await interaction.reply({
      content: 'text',
      components: [row],
    });
  }
}
