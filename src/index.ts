import { ShewenyClient } from "sheweny";
import { Partials, ActivityType, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

class Client extends ShewenyClient {
  constructor() {
    super({
      admins: ["1252710348054597693"],
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
      ],
      partials: [Partials.GuildMember],
      mode: "production",
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
        content: `⚠️ You're executing this command too fast! You can run it again <t:${Math.floor(Date.now() / 1000) + 4}:R>.`, 
        ephemeral: true 
      });
    });

    this.login(process.env.DISCORD_TOKEN);
  }
}

new Client();
