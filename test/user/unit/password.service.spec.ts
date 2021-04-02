import { FakeHashProvider } from 'src/user/providers/hashProvider/fakes/fake-hash.provider';
import { PasswordService } from 'src/user/services/password.service';

import { BadRequestException } from '@nestjs/common';

import { FakeUserTokensRepository } from '../fakes/fake-user-tokens.repository';
import { FakeUserRepository } from '../fakes/fake-user.repository';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let passwordService: PasswordService;
let fakeHashProvider: FakeHashProvider;

describe('PasswordService', () => {
  describe('ResetPasswordService', () => {
    beforeEach(() => {
      fakeUserRepository = new FakeUserRepository();
      fakeUserTokensRepository = new FakeUserTokensRepository();
      fakeHashProvider = new FakeHashProvider();

      passwordService = new PasswordService(
        fakeUserRepository,
        fakeUserTokensRepository,
        fakeHashProvider,
      );
    });

    it('should be able to reset the password', async () => {
      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const { token } = await fakeUserTokensRepository.generate(user.id);

      const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

      await passwordService.resetPassword({
        password: '121212',
        token,
      });

      const updatedUser = await fakeUserRepository.findById(user.id);

      expect(generateHash).toHaveBeenCalledWith('121212');
      expect(updatedUser.password).toBe('121212');
    });

    it('should not be able to reset the password with non-existing token', async () => {
      await expect(
        passwordService.resetPassword({
          token: 'non-existing-token',
          password: '121212',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to reset the password with non-existing user', async () => {
      const { token } = await fakeUserTokensRepository.generate(
        'non-existing user',
      );

      expect(
        passwordService.resetPassword({
          token,
          password: 'non-existing-token',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to reset password if passed more than 2 hours', async () => {
      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const { token } = await fakeUserTokensRepository.generate(user.id);

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        const customDate = new Date();

        return customDate.setHours(customDate.getHours() + 3);
      });

      await expect(
        passwordService.resetPassword({
          password: '121212',
          token,
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });
});
