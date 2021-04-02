import { SessionService } from 'src/session/session.service';
import { FakeHashProvider } from 'src/user/providers/hashProvider/fakes/fake-hash.provider';
import { UserService } from 'src/user/services/user.service';

import { UnauthorizedException } from '@nestjs/common';

import { FakeUserRepository } from '../../user/fakes/fake-user.repository';
import { FakeConfigService } from '../fakes/fake-config.service';
import { FakeJwtService } from '../fakes/fake-jwt.service';

let fakeUserRepository: FakeUserRepository;
let fakeConfigService: FakeConfigService;
let fakeJwtService: FakeJwtService;
let fakeHashProvider: FakeHashProvider;
let userService: UserService;
let sessionService: SessionService;

describe('SessionService', () => {
  describe('CreateSessionService', () => {
    beforeEach(() => {
      fakeUserRepository = new FakeUserRepository();
      fakeConfigService = new FakeConfigService();
      fakeJwtService = new FakeJwtService({
        secret: 'testando',
        signOptions: {
          expiresIn: '1d',
        },
      });
      fakeHashProvider = new FakeHashProvider();

      userService = new UserService(fakeUserRepository, fakeHashProvider);
      sessionService = new SessionService(
        fakeUserRepository,
        fakeJwtService,
        fakeConfigService,
        fakeHashProvider,
      );
    });

    it('should be able to authenticate', async () => {
      const user = await userService.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const response = await sessionService.create({
        email: 'davi@gmail.com',
        password: '123456',
      });

      expect(response).toHaveProperty('token');
      expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with  non existing user', async () => {
      expect(
        sessionService.create({
          email: 'davi@gmail.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should not be able to authenticate with wrong password', async () => {
      await userService.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      expect(
        sessionService.create({
          email: 'davi@gmail.com',
          password: 'wrong-password',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
