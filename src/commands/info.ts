import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ChatInputCommandInteraction, ApplicationCommandOptionType } from 'discord.js';

export class BotCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'bot',
      description: 'Bot',
      type: 'SLASH_COMMAND',
      options: [
        {
          name: 'info',
          description: 'Information about BCMOTI Management',
          type: ApplicationCommandOptionType.Subcommand,
        }
      ],
      userPermissions: ['UseApplicationCommands'],
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const subcommand = interaction.options.getSubcommand();

      if (subcommand === 'info') {
        if (!interaction.replied) {
          const ping = Math.round(this.client.ws.ping);
          
          await interaction.reply({
            content: `**Credits**
<@1252710348054597693> / mthis.ca

**Technical**
Latency: ${ping}ms
Deployment: Docker Container (railway)
Region: us-west2
Restart Policy: on failure
`,
            ephemeral: true
          });
        }
      }

    } catch (error) {
      console.error('Error in bot command:', error);
      if (!interaction.replied) {
        await interaction.reply({
          content: 'An error occurred while executing this command.',
          ephemeral: true
        });
      }
    }
  }
}
