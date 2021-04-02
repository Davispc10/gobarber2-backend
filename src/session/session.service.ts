import { User } from 'src/user/infra/typeorm/entities/user.entity';
import { IUserRepository } from 'src/user/interfaces/user.interface';
import { IHashProvider } from 'src/user/providers/hashProvider/models/hash-provider';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateSessionDto } from './dtos/create-session.dto';
import { IJwtToken } from './interfaces/jwtPayload.interface';

@Injectable()
export class SessionService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('IHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async create({ email, password }: CreateSessionDto): Promise<IJwtToken> {
    const user = await this.validateUser(email, password);

    const payload = { user };

    const token = await this.jwtService.signAsync(payload);

    return {
      user,
      token,
      expiresIn: this.configService.get('EXPIRES_IN'),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email/password combination.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect email/password combination.');
    }

    delete user.password;

    return user;
  }
}
