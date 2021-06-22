import { RedisOptions } from 'ioredis';

import { ConfigService } from '@nestjs/config';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

const configService = new ConfigService();

export const cacheConfig = {
  driver: 'redis',

  config: {
    redis: {
      host: configService.get('REDIS_HOST'),
      port: configService.get('REDIS_PORT'),
      password: configService.get('REDIS_PASS'),
    },
  },
} as ICacheConfig;
