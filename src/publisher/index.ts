import Redis from "ioredis";
import { redisOptions } from "../settings";

export class RedisConnection {
  private redis?: Redis.Redis;

  public connect() {
    this.redis = new Redis(redisOptions());
  }

  public disconnect() {
    this.redis?.disconnect();
    this.redis = undefined;
  }

  public isConnected() {
    return !!this.redis;
  }

  public send(message: string) {
    this.redis?.publish("bus::stream", message);
  }
}
