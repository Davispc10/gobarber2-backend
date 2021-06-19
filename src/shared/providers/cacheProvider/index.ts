import { RedisCacheProvider } from './implementations/redis-cache.provider';

export const cacheProviders = {
  redis: RedisCacheProvider,
};
