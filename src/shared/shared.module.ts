import { mailConfig } from 'src/config/mail.config';

import { Module } from '@nestjs/common';

import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { mailProviders } from './providers/mailProvider';
// import { EtherealMailProvider } from './providers/mailProvider/implementations/ethereal-mail.provider';
// import { SESMailProvider } from './providers/mailProvider/implementations/ses-mail.provider';
import { HandlebarsMailTemplateProvider } from './providers/mailTemplateProvider/implementations/handlebars-mail-template.provider';
import { DiskStorageProvider } from './providers/storageProvider/implementations/disk-storage.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: 'IStorageProvider',
      useClass: DiskStorageProvider,
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
