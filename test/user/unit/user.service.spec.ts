import { FakeCacheProvider } from 'src/shared/providers/cacheProvider/fakes/fake-cache.provider';
import { FakeHashProvider } from 'src/user/providers/hashProvider/fakes/fake-hash.provider';
import { UserService } from 'src/user/services/user.service';

import { BadRequestException } from '@nestjs/common';

import { FakeUserRepository } from '../fakes/fake-user.repository';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let userService: UserService;

describe('UserService', () => {
  describe('CreateUserService', () => {
    beforeEach(() => {
      fakeUserRepository = new FakeUserRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeCacheProvider = new FakeCacheProvider();
      userService = new UserService(
        fakeUserRepository,
        fakeHashProvider,
        fakeCacheProvider,
      );
    });

    it('should be able to create a new user', async () => {
      const user = await userService.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      expect(user).toHaveProperty('id');
      expect(user.name).toBe('David');
    });

    it('should not be able to create a new user with same email from another', async () => {
      await userService.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      expect(
        userService.create({
          name: 'David',
          email: 'davi@gmail.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('UpdateUserService', () => {
    beforeEach(() => {
      fakeUserRepository = new FakeUserRepository();
      fakeHashProvider = new FakeHashProvider();
      fakeCacheProvider = new FakeCacheProvider();
      userService = new UserService(
        fakeUserRepository,
        fakeHashProvider,
        fakeCacheProvider,
      );
    });

    it('should be able to update the profile', async () => {
      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const updatedUser = await userService.update(user.id, {
        name: 'Dovad',
        email: 'dova@gmail.com',
      });

      expect(updatedUser.name).toBe('Dovad');
      expect(updatedUser.email).toBe('dova@gmail.com');
    });

    it('should not be able to change to another user email', async () => {
      await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const user = await fakeUserRepository.create({
        name: 'Test',
        email: 'test@gmail.com',
        password: '123456',
      });

      await expect(
        userService.update(user.id, {
          name: 'Dovad',
          email: 'davi@gmail.com',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should be able to update the password', async () => {
      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const updatedUser = await userService.update(user.id, {
        name: 'Dovad',
        email: 'dova@gmail.com',
        oldPassword: '123456',
        password: '123123',
      });

      expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      await expect(
        userService.update(user.id, {
          name: 'Dovad',
          email: 'dova@gmail.com',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to update the password with wrong old password', async () => {
      const user = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      await expect(
        userService.update(user.id, {
          name: 'Dovad',
          email: 'dova@gmail.com',
          oldPassword: 'wrong-old-password',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to update the profile from non-existing user', async () => {
      await expect(
        userService.update('non-existing-user', {
          name: 'Dovad',
          email: 'dova@gmail.com',
          oldPassword: 'wrong-old-password',
          password: '123123',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  // describe('ShowProfileService', () => {
  //   beforeEach(() => {
  //     fakeUserRepository = new FakeUserRepository();
  //     userService = new UserService(fakeUserRepository, fakeHashProvider);
  //   });

  //   it('should be able to show the profile', async () => {
  //     const user = await fakeUserRepository.create({
  //       name: 'David',
  //       email: 'davi@gmail.com',
  //       password: '123456',
  //     });

  //     const profile = await userService.findOne(user.id);

  //     expect(updatedUser.name).toBe('Dovad');
  //     expect(updatedUser.email).toBe('dova@gmail.com');
  //   });
});
