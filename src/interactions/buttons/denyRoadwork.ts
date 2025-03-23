import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ButtonInteraction, EmbedBuilder, GuildMember } from 'discord.js';

export class DenyRoadworkButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, [/^deny_roadwork_\d+$/]);
  }

  async execute(interaction: ButtonInteraction) {
    try {
      const message = interaction.message;
      const originalEmbed = message.embeds[0];

      if (originalEmbed) {
        const updatedEmbed = new EmbedBuilder()
          .setTitle('Roadwork Request Denied')
          .setDescription(originalEmbed.description)
          .setColor('#DA363C')
          .setFields(originalEmbed.fields)
          .setTimestamp()
          .setFooter({ text: `Denied by ${(interaction.member as GuildMember)?.displayName || interaction.user.username}` });

        await message.edit({
          embeds: [updatedEmbed],
          components: []
        });
      }
    } catch (error) {
      console.error('Error in deny roadwork button:', error);
      await interaction.reply({
        content: 'An error occurred while processing the request.',
        ephemeral: true
      });
    }
  }
}
