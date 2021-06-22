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

const configService = new ConfigService();

export const mailConfig = {
  driver: configService.get('MAIL_DRIVER') || 'ses',
  defaults: {
    from: {
      email: configService.get('MAIL_ADDRESS'),
      name: 'Oi',
    },
  },
} as IMailConfig;
