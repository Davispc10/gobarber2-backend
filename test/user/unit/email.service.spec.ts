import { FakeMailProvider } from 'src/shared/providers/mailProvider/fakes/fake-mail.provider';
import { EmailService } from 'src/user/services/email.service';

import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FakeUserTokensRepository } from '../fakes/fake-user-tokens.repository';
import { FakeUserRepository } from '../fakes/fake-user.repository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let emailService: EmailService;
let configService: ConfigService;

describe('EmailService', () => {
  describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
      fakeUserRepository = new FakeUserRepository();
      fakeMailProvider = new FakeMailProvider();
      fakeUserTokensRepository = new FakeUserTokensRepository();
      configService = new ConfigService();

      emailService = new EmailService(
        fakeUserRepository,
        fakeMailProvider,
        fakeUserTokensRepository,
        configService,
      );
    });

    it('should be able recover the password using the email', async () => {
      const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

      await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      await emailService.sendForgotPasswordEmail({
        email: 'davi@gmail.com',
      });

      expect(sendMail).toHaveBeenCalled();
      // expect(sendMail).toHaveBeenCalledWith(
      //   'davi@gmail.com',
      //   'Pedido de recuperação de senha recebido!',
      // );
    });

    it('should not be able recover a non-existing user password', async () => {
      await expect(
        emailService.sendForgotPasswordEmail({
          email: 'davi@gmail.com',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should generate a forgot password token', async () => {
      const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      await emailService.sendForgotPasswordEmail({
        email: 'davi@gmail.com',
      });

      expect(generateToken).toHaveBeenCalledWith(user.id);
    });
  });
});
