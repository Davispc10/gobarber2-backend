import { isAfter, addHours } from 'date-fns';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
  IUserRepository,
  IUserTokensRepository,
} from '../interfaces/user.interface';
import { IHashProvider } from '../providers/hashProvider/models/hash-provider';

interface IRequest {
  token: string;
  password: string;
}

@Injectable()
export class PasswordService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserTokensRepository')
    private readonly userTokenRepository: IUserTokensRepository,
    @Inject('IHashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

  async resetPassword({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new BadRequestException('User token does not exists');
    }

    const user = await this.userRepository.findById(userToken.userId);

    if (!user) {
      throw new BadRequestException('User does not exists');
    }

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new BadRequestException('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}
