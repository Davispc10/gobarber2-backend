import { ProviderService } from '@appointment/services/provider.service';
import { FakeCacheProvider } from '@shared/providers/cacheProvider/fakes/fake-cache.provider';

import { FakeUserRepository } from '../../user/fakes/fake-user.repository';

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let providerService: ProviderService;

describe('ProfileService', () => {
  describe('ListAllProviders', () => {
    beforeEach(() => {
      fakeUserRepository = new FakeUserRepository();
      fakeCacheProvider = new FakeCacheProvider();

      providerService = new ProviderService(
        fakeUserRepository,
        fakeCacheProvider,
      );
    });

    it('should be able to list the providers', async () => {
      const user1 = await fakeUserRepository.create({
        name: 'David',
        email: 'davi@gmail.com',
        password: '123456',
      });

      const user2 = await fakeUserRepository.create({
        name: 'Dovad',
        email: 'dovad@gmail.com',
        password: '123456',
      });

      const loggedUser = await fakeUserRepository.create({
        name: 'Didi',
        email: 'didi@gmail.com',
        password: '123456',
      });

      const providers = await providerService.findAll(loggedUser.id);

      expect(providers).toEqual([user1, user2]);
    });
  });
});
