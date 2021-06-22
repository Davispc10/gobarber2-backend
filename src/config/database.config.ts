import { join, resolve } from 'path';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configService = new ConfigService();

export const options: TypeOrmModuleOptions[] = [
  {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DBNAME'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    logging: false,
    synchronize: false,
    // migrationsRun: true,
    migrations: [
      resolve(
        __dirname,
        '..',
        'shared',
        'infra',
        'typeorm',
        'migrations',
        '*.{ts,js}',
      ),
    ],
    cli: {
      migrationsDir: resolve(
        __dirname,
        '..',
        'shared',
        'infra',
        'typeorm',
        'migrations',
      ),
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: configService.get('MONGO_HOST'),
    port: configService.get('MONGO_PORT'),
    database: configService.get('MONGO_DBNAME'),
    username: configService.get('MONGO_USERNAME'),
    useUnifiedTopology: true,
    entities: [join(__dirname, '..', '**', 'schemas', '*.schema.{ts,js}')],
  },
];
