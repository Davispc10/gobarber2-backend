import { mailConfig } from '@config/mail.config';
import { storageConfig } from '@config/storage.config';
import { Module } from '@nestjs/common';

import { cacheConfig } from '../config/cache.config';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { cacheProviders } from './providers/cacheProvider';
import { mailProviders } from './providers/mailProvider';
import { HandlebarsMailTemplateProvider } from './providers/mailTemplateProvider/implementations/handlebars-mail-template.provider';
import { storageProviders } from './providers/storageProvider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: 'IStorageProvider',
      useClass: storageProviders[storageConfig.driver],
    },
    {
      provide: 'IMailTemplateProvider',
      useClass: HandlebarsMailTemplateProvider,
    },
    {
      provide: 'IMailProvider',
      useClass: mailProviders[mailConfig.driver],
    },
    {
      provide: 'ICacheProvider',
      useClass: cacheProviders[cacheConfig.driver],
    },
  ],
  exports: [
    JwtStrategy,
    'IStorageProvider',
    'IMailProvider',
    'IMailTemplateProvider',
    'ICacheProvider',
  ],
})
export class SharedModule {}
