import { CreateUserDto } from '../dtos/create-user.dto';
import { FindAllProvidersDto } from '../dtos/find-providers.dto';
import { UserToken } from '../infra/typeorm/entities/user-token.entity';
import { User } from '../infra/typeorm/entities/user.entity';

export interface IUserRepository {
  findAllProviders(data: FindAllProvidersDto): Promise<User[]>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(createUserDto: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}

export interface IUserTokensRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken>;
}
