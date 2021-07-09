import { classToClass } from 'class-transformer';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IStorageProvider } from '@shared/providers/storageProvider/models/storage.provider';

import { User } from '../infra/typeorm/entities/user.entity';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class UpdateAvatarService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IStorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async updateAvatar(avatarFileName: string, userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new BadRequestException(
        'Only authenticated users can change avatar.',
      );
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.userRepository.save(user);

    return classToClass(user);
  }
}
