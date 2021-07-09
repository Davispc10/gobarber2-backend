import { resolve } from 'path';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMailProvider } from '@shared/providers/mailProvider/models/mail.provider';

import { IMailRequest } from '../interfaces/mail.interface';
import {
  IUserRepository,
  IUserTokensRepository,
} from '../interfaces/user.interface';

@Injectable()
export class EmailService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IMailProvider')
    private readonly mailProvider: IMailProvider,
    @Inject('IUserTokensRepository')
    private readonly userTokenRepository: IUserTokensRepository,
    @Inject('ConfigService')
    private readonly configService: ConfigService,
  ) {}

  async sendForgotPasswordEmail({ email }: IMailRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exists!');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${this.configService.get(
            'APP_WEB_URL',
          )}/reset_password?token=${token}`,
        },
      },
    });
  }
}
