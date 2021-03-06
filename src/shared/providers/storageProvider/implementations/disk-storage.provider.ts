import { promises } from 'fs';
import { resolve } from 'path';

import { uploadConfig } from '@config/upload.config';

import { IStorageProvider } from '../models/storage.provider';

export class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    console.log('discooooooooooooooooo');
    await promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file);

    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}
