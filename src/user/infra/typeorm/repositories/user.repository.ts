import { Not, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@user/dtos/create-user.dto';
import { FindAllProvidersDto } from '@user/dtos/find-providers.dto';
import { IUserRepository } from '@user/interfaces/user.interface';

import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.userRepository.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.userRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async findAllProviders({
    exceptUserId,
  }: FindAllProvidersDto): Promise<User[]> {
    let users: User[];

    if (exceptUserId) {
      users = await this.userRepository.find({
        where: {
          id: Not(exceptUserId),
        },
      });
    } else {
      users = await this.userRepository.find();
    }

    return users;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);

    await this.userRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
