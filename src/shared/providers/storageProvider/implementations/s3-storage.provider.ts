import { S3 } from 'aws-sdk';
import { promises } from 'fs';
import { resolve } from 'path';
import { storageConfig } from 'src/config/storage.config';
import { uploadConfig } from 'src/config/upload.config';

import { BadRequestException } from '@nestjs/common';

import { IStorageProvider } from '../models/storage.provider';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = resolve(uploadConfig.tmpFolder, file);

    const ContentType = originalPath.split('.').pop();

    if (!ContentType) {
      throw new BadRequestException('File not found!');
    }

    const fileContent = await promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: storageConfig.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'gobarber-david-s3',
        Key: file,
      })
      .promise();
  }
}
