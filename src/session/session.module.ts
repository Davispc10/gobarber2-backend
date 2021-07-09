import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@shared/infra/strategies/jwt.strategy';
import { InfraUserModule } from '@user/infra/typeorm/infra-user.module';
import { HashProviderModule } from '@user/providers/hash-provider.module';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [
    InfraUserModule,
    PassportModule,
    HashProviderModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SessionController],
  providers: [SessionService, JwtStrategy],
  exports: [SessionService],
})
export class SessionModule {}
