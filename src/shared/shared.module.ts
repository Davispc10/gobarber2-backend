import { Module } from '@nestjs/common';

import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { EtherealMailProvider } from './providers/mailProvider/implementations/ethereal-mail.provider';
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
      provide: 'IMailProvider',
      useClass: EtherealMailProvider,
    },
    {
      provide: 'IMailTemplateProvider',
      useClass: HandlebarsMailTemplateProvider,
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
