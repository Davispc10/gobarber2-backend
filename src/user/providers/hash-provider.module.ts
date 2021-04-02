import { Module } from '@nestjs/common';

import { BCryptHashProvider } from './hashProvider/implementations/bcrypt-hash.provider';

@Module({
  providers: [
    {
      provide: 'IHashProvider',
      useClass: BCryptHashProvider,
    },
  ],
  exports: ['IHashProvider'],
})
export class HashProviderModule {}
