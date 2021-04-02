import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserToken } from './entities/user-token.entity';
import { User } from './entities/user.entity';
import { UserTokensRepository } from './repositories/user-tokens.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserToken])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserTokensRepository',
      useClass: UserTokensRepository,
    },
  ],
  exports: ['IUserRepository', 'IUserTokensRepository'],
})
export class TypeOrmInfraUserModule {}
