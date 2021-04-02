import { resolve } from 'path';
import { IMailProvider } from 'src/shared/providers/mailProvider/models/mail.provider';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';

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
  ) {}

  async sendForgotPasswordEmail({ email }: IMailRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User does not exists!');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = resolve(
      'src',
      'user',
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
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });
  }
}
