import { classToClass } from 'class-transformer';

import { Inject, Injectable } from '@nestjs/common';
import { ICacheProvider } from '@shared/providers/cacheProvider/models/cache.provider';
import { User } from '@user/infra/typeorm/entities/user.entity';
import { IUserRepository } from '@user/interfaces/user.interface';

@Injectable()
export class ProviderService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('ICacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  async findAll(userId: string): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${userId}`,
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        exceptUserId: userId,
      });

      await this.cacheProvider.save(`providers-list:${userId}`, users);
    }

    return users.map((user) => classToClass(user));
  }
}
