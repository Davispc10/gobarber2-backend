import { IUserTokensRepository } from 'src/user/interfaces/user.interface';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserToken } from '../entities/user-token.entity';

@Injectable()
export class UserTokensRepository implements IUserTokensRepository {
  constructor(
    @InjectRepository(UserToken)
    private readonly ormRepository: Repository<UserToken>,
  ) {}

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
