import { ConfigService } from '@nestjs/config';

interface IStorageConfig {
  driver: 'disk' | 's3';
  aws: {
    bucket: string;
  };
}

const configService = new ConfigService();

export const storageConfig = {
  driver: configService.get('STORAGE_DRIVER') || 's3',
  aws: {
    bucket: 'gobarber-david-s3',
  },
} as IStorageConfig;
