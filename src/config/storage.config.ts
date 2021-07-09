interface IStorageConfig {
  driver: 'disk' | 's3';
  aws: {
    bucket: string;
  };
}

export const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 's3',
  aws: {
    bucket: 'gobarber-david-s3',
  },
} as IStorageConfig;
