import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { ChatInputCommandInteraction, EmbedBuilder, ApplicationCommandOptionType, GuildMember, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { ROLES } from '../config/roles.js';

export class GroupShiftCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: 'groupshift',
      description: 'Send a group shift notification',
      type: 'SLASH_COMMAND',
      options: [
        {
          name: 'type',
          description: 'Select the type of shift',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            { name: 'Mundies', value: 'mundies' },
            { name: 'BCAA', value: 'bcaa' }
          ]
        }
      ],
      userPermissions: ['UseApplicationCommands'],
    });
  }

  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const member = interaction.member as GuildMember;
      if (!member || !ROLES.GROUP_SHIFT.some(roleId => member.roles.cache.has(roleId))) {
        await interaction.reply({
          content: `❌ You do not have permission to use this command.`,
          ephemeral: true
        });
        return;
      }

      const shiftType = interaction.options.getString('type', true);
      const channel = await interaction.client.channels.fetch('1082772225456877658');

      if (!channel || !(channel instanceof TextChannel)) {
        if (!interaction.replied) {
          await interaction.reply({
            content: '❌ Target channel not found or is not a text channel.',
            ephemeral: true
          });
        }
        return;
      }

      const embed = new EmbedBuilder()
        .setColor('#1D4A88')
        .setFooter({ text: 'React if you intend to participate' })
        .setTimestamp();

      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setLabel('Join Server')
            .setStyle(ButtonStyle.Link)
            .setURL('https://policeroleplay.community/join?code=VancouverRP&placeId=2534724415')
        );

      if (shiftType === 'mundies') {
        embed
          .setTitle('<:Mundies_Tow:1172988508483375164> Mundies Shift')
          .setDescription(`**${(interaction.member as GuildMember)?.displayName || interaction.user.username}** has started a group shift! All roadside assistance personnel are requested to join and assist the team.`);
      } else {
        embed
          .setTitle('<:BCAA:1287313470190125107> BCAA Shift')
          .setDescription(`**${(interaction.member as GuildMember)?.displayName || interaction.user.username}** has started a group shift! All roadside assistance personnel are requested to join and assist the team.`);
      }

      const message = await channel.send({
        content: 'role ping', //<@&1082047459506786385>
        embeds: [embed],
        components: [row]
      });

      await message.react('👋');

      if (!interaction.replied) {
        await interaction.reply({
          content: 'Sent!',
          ephemeral: true
        });
      }

    } catch (error) {
      console.error('Error in group shift command:', error);
      if (!interaction.replied) {
        await interaction.reply({
          content: 'An error occurred while executing this command.',
          ephemeral: true
        });
      }
    }
  }
}
