import { mailConfig } from 'src/config/mail.config';
import { storageConfig } from 'src/config/storage.config';

import { Module } from '@nestjs/common';

import { JwtStrategy } from './infra/strategies/jwt.strategy';
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
  ],
  exports: [
    JwtStrategy,
    'IStorageProvider',
    'IMailProvider',
    'IMailTemplateProvider',
  ],
})
export class SharedModule {}
