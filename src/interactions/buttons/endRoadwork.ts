import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ButtonInteraction } from 'discord.js';

export class EndRoadworkButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, ['end_roadwork']);
  }

  async execute(interaction: ButtonInteraction) {
    try {
      const messageContent = interaction.message.content;
      console.log("Message content:", messageContent); // Debug log
      
      let requesterMatch = messageContent.match(/Site Host: <@(\d+)>/);
      if (!requesterMatch) {
        requesterMatch = messageContent.match(/👷 \*\*Site Host:\*\* <@(\d+)>/);
      }
      
      if (!requesterMatch) {
        await interaction.reply({
          content: 'Could not identify the requester of this roadwork.',
          ephemeral: true
        });
        return;
      }
      
      const requesterId = requesterMatch[1];
      console.log("Requester ID:", requesterId); // Debug log
      console.log("User ID:", interaction.user.id); // Debug log
      
      if (interaction.user.id !== requesterId) {
        await interaction.reply({
          content: 'Only the person who requested this roadwork can end it.',
          ephemeral: true
        });
        return;
      }
      
      const originalContent = interaction.message.content;
      
      const strikethroughContent = `~~${originalContent}~~\n\nRoadwork has ended!`;
      
      await interaction.message.edit({
        content: strikethroughContent,
        components: []
      });
      
      await interaction.reply({
        content: 'Roadwork has been marked as ended.',
        ephemeral: true
      });
    } catch (error) {
      console.error('Error in end roadwork button:', error);
      await interaction.reply({
        content: 'There was an error processing this request.',
        ephemeral: true
      });
    }
  }
}
