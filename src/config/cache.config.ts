import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export const cacheConfig = () =>
  ({
    driver: 'redis',

    config: {
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT) || 61379,
        password: process.env.REDIS_PASS,
      },
    },
  } as ICacheConfig);
