import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ButtonInteraction, EmbedBuilder, TextChannel, GuildMember, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export class AcceptRoadworkButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, [/^accept_roadwork_\d+$/]);
  }

  async execute(interaction: ButtonInteraction) {
    try {
      const message = interaction.message;
      const originalEmbed = message.embeds[0];

      if (originalEmbed) {
        const updatedEmbed = new EmbedBuilder()
          .setTitle('Roadwork Request Accepted')
          .setDescription(originalEmbed.description)
          .setColor('#248045')
          .setFields(originalEmbed.fields)
          .setTimestamp()
          .setFooter({ text: `Accepted by ${interaction.user.tag}` });

        await message.edit({
          embeds: [updatedEmbed],
          components: []
        });

        const approvedChannel = await interaction.client.channels.fetch('1082043410489278495');
        if (approvedChannel instanceof TextChannel) {
          const fields = originalEmbed.fields.map(field => {
            let emoji = '🛻';
            if (field.name.toLowerCase().includes('description')) emoji = '📄';
            if (field.name.toLowerCase().includes('location')) emoji = '🗺️';
            if (field.name.toLowerCase().includes('vehicles_needed')) emoji = '🛻';
            return `${emoji} **${field.name}:**\n${field.value}`;
          }).join('\n\n');
          
          const button = interaction.message.components?.[0]?.components?.[0];
          const requesterId = button?.customId?.split('_')[2] || 'Unknown';
          
          const endButton = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('end_roadwork')
                .setLabel('End Roadwork')
                .setStyle(ButtonStyle.Danger)
            );
          
          await approvedChannel.send({ 
            content: `-# Approved by ${(interaction.member as GuildMember)?.displayName || interaction.user.username}\n-# <@&1082047464326053928> <@&1187259879493206056>\n## <:Workers:1082100926837436557> Mainroad is now hiring!\n👷 **Site Host:** <@${requesterId}>\n${fields}`,
            components: [endButton]
          });
        }

        await interaction.reply({ content: 'Roadwork request has been approved!', ephemeral: true });
      }
    } catch (error) {
      console.error('Error in accept roadwork button:', error);
      await interaction.reply({
        content: 'There was an error processing this request.',
        ephemeral: true
      });
    }
  }
}
