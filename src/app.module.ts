import { join, resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppointmentModule } from './appointment/appointment.module';
import { NotificationModule } from './notification/notification.module';
import { SessionModule } from './session/session.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
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
    UserModule,
    AppointmentModule,
    SessionModule,
    SharedModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
