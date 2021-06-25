import { join, resolve } from 'path';

import { cacheConfig } from '@config/cache.config';
import { mailConfig } from '@config/mail.config';
import { storageConfig } from '@config/storage.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentModule } from './appointment/appointment.module';
import { NotificationModule } from './notification/notification.module';
import { SessionModule } from './session/session.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [cacheConfig, storageConfig],
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 5,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DBNAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        logging: false,
        synchronize: false,
        // migrationsRun: true,
        migrations: [
          resolve(
            __dirname,
            'shared',
            'infra',
            'typeorm',
            'migrations',
            '*.ts',
          ),
        ],
        cli: {
          migrationsDir: resolve(
            __dirname,
            'shared',
            'infra',
            'typeorm',
            'migrations',
          ),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot({
      name: 'mongo',
      type: 'mongodb',
      host: configService.get('MONGO_HOST'),
      port: configService.get('MONGO_PORT'),
      database: configService.get('MONGO_DBNAME'),
      username: configService.get('MONGO_USERNAME'),
      password: configService.get('MONGO_PASSWORD'),
      useUnifiedTopology: true,
      entities: [join(__dirname, '**', 'schemas', '*.schema.{ts,js}')],
    }),
    NotificationModule,
    UserModule,
    AppointmentModule,
    SessionModule,
    SharedModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
