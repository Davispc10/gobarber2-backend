import { Exclude, Expose } from 'class-transformer';
import { storageConfig } from 'src/config/storage.config';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string {
    if (!this.avatar) {
      return null;
    }

    switch (storageConfig.driver) {
      case 'disk':
        return `${configService.get('APP_API_URL')}/avatar/${this.avatar}`;
      case 's3':
        return `https://${storageConfig.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}
