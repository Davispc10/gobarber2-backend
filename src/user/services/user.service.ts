import { classToClass } from 'class-transformer';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICacheProvider } from '@shared/providers/cacheProvider/models/cache.provider';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../infra/typeorm/entities/user.entity';
import { IUserRepository } from '../interfaces/user.interface';
import { IHashProvider } from '../providers/hashProvider/models/hash-provider';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IHashProvider')
    private hashProvider: IHashProvider,
    @Inject('ICacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  async create({ email, name, password }: CreateUserDto): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new BadRequestException('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => classToClass(user));
  }

  async update(
    id: string,
    { name, email, password, oldPassword }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('User does not found');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new BadRequestException('E-mail already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !oldPassword) {
      throw new BadRequestException(
        'You need to inform the old password to set new password',
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new BadRequestException('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return await this.userRepository.save(user);
  }
}
