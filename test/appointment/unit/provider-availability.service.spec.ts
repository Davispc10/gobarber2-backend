import { ProviderAvailabilityService } from '@appointment/services/provider-availability.service';

import { FakeAppointmentRepository } from '../fakes/fake-appointment.repository';

let providerAvailabilityService: ProviderAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ProviderAvailabilityService', () => {
  describe('List month', () => {
    beforeEach(() => {
      fakeAppointmentRepository = new FakeAppointmentRepository();
      providerAvailabilityService = new ProviderAvailabilityService(
        fakeAppointmentRepository,
      );
    });

    it('should be able to list the month availability from provider', async () => {
      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 8, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 9, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 10, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 11, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 12, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 13, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 14, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 15, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 16, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 3, 20, 17, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 4, 21, 8, 0, 0),
      });

      const availability = await providerAvailabilityService.month({
        providerId: 'user',
        year: 2021,
        month: 4,
      });

      expect(availability).toEqual(
        expect.arrayContaining([
          { day: 19, available: true },
          { day: 20, available: false },
          { day: 21, available: true },
          { day: 22, available: true },
        ]),
      );
    });
  });

  describe('List Day', () => {
    beforeEach(() => {
      fakeAppointmentRepository = new FakeAppointmentRepository();
      providerAvailabilityService = new ProviderAvailabilityService(
        fakeAppointmentRepository,
      );
    });

    it('should be able to list the day availability from provider', async () => {
      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 4, 20, 14, 0, 0),
      });

      await fakeAppointmentRepository.create({
        providerId: 'user',
        userId: '1231213',
        date: new Date(2021, 4, 20, 15, 0, 0),
      });

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2021, 4, 20, 11).getTime();
      });

      const availability = await providerAvailabilityService.day({
        providerId: 'user',
        year: 2021,
        month: 5,
        day: 20,
      });

      expect(availability).toEqual(
        expect.arrayContaining([
          { hour: 8, available: false },
          { hour: 9, available: false },
          { hour: 10, available: false },
          { hour: 13, available: true },
          { hour: 14, available: false },
          { hour: 15, available: false },
          { hour: 16, available: true },
        ]),
      );
    });
  });
});
