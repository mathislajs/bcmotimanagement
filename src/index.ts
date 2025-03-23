import { ShewenyClient } from "sheweny";
import { Partials, ActivityType, GatewayIntentBits, TextChannel } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

class Client extends ShewenyClient {
  constructor() {
    super({
      admins: ["1252710348054597693"],
      intents: ["Guilds", "GuildMembers", "GuildMessages"],
      partials: [Partials.GuildMember],
      mode: "development",
      joinThreadsOnCreate: true,
//      presence: {
//        status: "online",
//        activities: [{ 
//            name: '/help', 
//            type: ActivityType.Custom,
//        }], 
//      },
      managers: {
        commands: {
          directory: "./src/commands",
          prefix: "!",
          applicationPermissions: true,
          guildId: process.env.TEST_GUILD_ID,
          default: {
            userPermissions: ["UseApplicationCommands"],
          }
        },
        events: {
          directory: "./src/events",
        },
        buttons: {
          directory: "./src/interactions/buttons",
        },
        modals: {
          directory: "./src/interactions/modals",
        },
      },
    });

    this.managers.commands!.on("cooldownLimit", (ctx) => {
      return ctx.reply({ 
        content: `You're executing this command too fast! You can run it again <t:${Math.floor(Date.now() / 1000) + 10}:R>.`, 
        ephemeral: true 
      });
    });

    this.on('ready', async () => {
      console.log('Ready & online');
      
      try {
        const channel = await this.channels.fetch('1226685483824713738') as TextChannel;
        if (channel?.isTextBased()) {
          await channel.send({
            content: 'Restarted & now online',
          });
        }
      } catch (error) {
        console.error('Failed to send startup message:', error);
      }
    });

    this.login(process.env.DISCORD_TOKEN);
  }
}

new Client();
