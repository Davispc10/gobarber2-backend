import { User } from '@user/infra/typeorm/entities/user.entity';

export interface IJwtPayload {
  iat: number;
  exp: number;
  user: User;
}

export interface IJwtToken {
  user: User;
  token: string;
  expiresIn: number;
}
