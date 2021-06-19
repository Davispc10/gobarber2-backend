import { DiskStorageProvider } from './implementations/disk-storage.provider';
import { S3StorageProvider } from './implementations/s3-storage.provider';

export const storageProviders = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};
