import cron from "node-cron";
import { Poller } from "./poller";
import { RedisConnection } from "./publisher";

function main(): void {
  const poller = new Poller();
  const redis = new RedisConnection();
  redis.connect();

  try {
    cron.schedule("*/5 * * * * *", async () => {
      const updates = await poller.poll();
      updates.forEach(update => redis.send(JSON.stringify(update)));
    });
  } finally {
    redis.disconnect();
  }
}

main();
