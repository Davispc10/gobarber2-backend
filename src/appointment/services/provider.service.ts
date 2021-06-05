import { classToClass } from 'class-transformer';
import { User } from 'src/user/infra/typeorm/entities/user.entity';
import { IUserRepository } from 'src/user/interfaces/user.interface';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProviderService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(id: string): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      exceptUserId: id,
    });

    return users.map((user) => classToClass(user));
  }
}
