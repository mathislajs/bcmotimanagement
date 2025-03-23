import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ApplicationCommandOptionType, TextChannel } from 'discord.js';

export class RoadworkRequestCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'rr',
      description: 'Send the message that initiates roadwork requests',
      type: 'SLASH_COMMAND',
      options: [
        {
          name: 'channel',
          description: 'Select the channel',
          type: ApplicationCommandOptionType.Channel,
          channelTypes: [ChannelType.GuildText],
          required: true,
        }
      ],
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const targetChannel = interaction.options.getChannel('channel', true);

      if (!(targetChannel instanceof TextChannel)) {
        return await interaction.reply({
          content: '❌ The selected channel must be a text channel.',
          ephemeral: true
        });
      }

      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('open_roadwork_request_modal')
            .setLabel('Submit Roadwork Request')
            .setStyle(ButtonStyle.Secondary)
        );

      await targetChannel.send({
        content: '## :arrow_down: Click the button below to submit a roadwork request\nReview the [information channel](<https://discord.com/channels/1082041596020805712/1192299058371510272>) concerning roadworks and the [vehicle structure](<https://docs.google.com/spreadsheets/d/1o4qkgXUm3IklVXTiJw19_XdjWxOyrhrhcUh40gjXqE8/edit?usp=sharing>) before making a request.',
        components: [row]
      });

      return await interaction.reply({
        content: `✅`,
        ephemeral: true
      });

    } catch (error) {
      console.error('Error in RR command:', error);
      return await interaction.reply({
        content: '❌ The selected channel must be a text channel.',
        ephemeral: true
      });
    }
  }
} 