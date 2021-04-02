import { User } from 'src/user/infra/typeorm/entities/user.entity';

export interface IGetUser {
  user: User;
}
