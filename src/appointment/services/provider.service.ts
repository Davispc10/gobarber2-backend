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
    let users = await this.userRepository.findAllProviders({
      exceptUserId: id,
    });

    users = users.map((user) => {
      delete user.password;

      return user;
    });

    return users;
  }
}
