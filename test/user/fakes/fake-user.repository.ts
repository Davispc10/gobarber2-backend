import { classToClass } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '@user/dtos/create-user.dto';
import { FindAllProvidersDto } from '@user/dtos/find-providers.dto';
import { User } from '@user/infra/typeorm/entities/user.entity';
import { IUserRepository } from '@user/interfaces/user.interface';

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    exceptUserId,
  }: FindAllProvidersDto): Promise<User[]> {
    let users = this.users;

    if (exceptUserId) {
      users = this.users.filter((user) => user.id !== exceptUserId);
    }

    return users;
  }

  public async create(userData: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidv4() }, userData);

    this.users.push(user);

    return classToClass(user);
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }
}
