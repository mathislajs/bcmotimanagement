import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";

export class cooldownEvent extends Event {
  constructor(client: ShewenyClient) {
    super(client, "cooldownLimit", {
      description: "cooldown",
      once: false,
      emitter: client.managers.commands,
    });
  }

  execute() {
  }
}
