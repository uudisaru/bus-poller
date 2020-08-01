import { RedisOptions } from "ioredis";

export const API_TALLINN_BUS_POSITIONS =
  process.env.API_TALLINN_BUS_POSITIONS ||
  "https://transport.tallinn.ee/gps.txt";

export function redisOptions(): RedisOptions {
  const options: RedisOptions = {
    host: process.env.REDIS_HOST ?? "localhost",
  };

  if (process.env.REDIS_PORT) {
    options.port = Number(process.env.REDIS_PORT);
  }
  options.password = process.env.REDIS_PASSWORD;
  options.username = process.env.REDIS_USERNAME;

  return options;
}
