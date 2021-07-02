import { mailConfig } from '@config/mail.config';
import { storageConfig } from '@config/storage.config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
      provide: 'IMailTemplateProvider',
      useClass: HandlebarsMailTemplateProvider,
    },
    {
      provide: 'IMailProvider',
      useClass: mailProviders.ses,
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => {
      //   console.log(configService.get('MAIL_DRIVER'));
      //   return new mailProviders[
      //     configService.get('MAIL_DRIVER') || 'ethereal'
      //   ]();
      // },
    },
    {
      provide: 'ICacheProvider',
      useClass: cacheProviders[cacheConfig().driver],
      // useFactory: (configService: ConfigService) => {
      //   return new cacheProviders[cacheConfig().driver]();
      // },
      // inject: [ConfigService],
    },
    {
      provide: 'IStorageProvider',
      useFactory: (configService: ConfigService) => {
        return new storageProviders[
          configService.get('STORAGE_DRIVER') || 'disk'
        ]();
      },
      inject: [ConfigService],
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
