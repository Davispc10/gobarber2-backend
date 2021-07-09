import { User } from '@user/infra/typeorm/entities/user.entity';

export interface IGetUser {
  user: User;
}
