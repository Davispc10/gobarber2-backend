import * as path from 'path';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configService = new ConfigService();

const options: TypeOrmModuleOptions[] = [
  {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DBNAME'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    logging: true,
    synchronize: true,
    // migrationsRun: true,
    migrations: [
      path.resolve(
        __dirname,
        '..',
        'shared',
        'infra',
        'typeorm',
        'migrations',
        '*.ts',
      ),
    ],
    cli: {
      migrationsDir: path.resolve(
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
    useUnifiedTopology: true,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  },
];

module.exports = options;
