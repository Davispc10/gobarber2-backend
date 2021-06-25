import { ConfigService } from '@nestjs/config';

interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

// const configService = new ConfigService();

export const mailConfig = (configService) =>
  ({
    driver: configService.get('MAIL_DRIVER') || 'ethereal',

    defaults: {
      from: {
        email: configService.get('MAIL_ADDRESS'),
        name: 'Oi',
      },
    },
  } as IMailConfig);
