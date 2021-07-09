import { BadRequestException } from '@nestjs/common';
import { FakeStorageProvider } from '@shared/providers/storageProvider/fakes/fake-storage.provider';
import { UpdateAvatarService } from '@user/services/update-avatar.service';

import { FakeUserRepository } from '../fakes/fake-user.repository';

let fakeUserRepository: FakeUserRepository;
let fakeDiskStorageProvider: FakeStorageProvider;

describe('UpdateUserAvatarService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeDiskStorageProvider = new FakeStorageProvider();
  });

  it('should be able to update avatar user', async () => {
    const updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    let user = await fakeUserRepository.create({
      name: 'David',
      email: 'davi@gmail.com',
      password: '123456',
    });

    user = await updateAvatarService.updateAvatar('avatar.jpg', user.id);

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    expect(
      updateAvatarService.updateAvatar('avatar.jpg', 'non-existing-user'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const updateAvatarService = new UpdateAvatarService(
      fakeUserRepository,
      fakeDiskStorageProvider,
    );

    let user = await fakeUserRepository.create({
      name: 'David',
      email: 'davi@gmail.com',
      password: '123456',
    });

    await updateAvatarService.updateAvatar('avatar.jpg', user.id);

    user = await updateAvatarService.updateAvatar('avatar2.jpg', user.id);

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
