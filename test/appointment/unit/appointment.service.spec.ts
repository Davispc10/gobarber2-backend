import { AppointmentService } from 'src/appointment/services/appointment.service';
import { FakeCacheProvider } from 'src/shared/providers/cacheProvider/fakes/fake-cache.provider';

import { BadRequestException } from '@nestjs/common';

import { FakeNotificationRepository } from '../../notification/fakes/fake-notification.repository';
import { FakeAppointmentRepository } from '../fakes/fake-appointment.repository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let appointmentService: AppointmentService;

describe('AppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    fakeCacheProvider = new FakeCacheProvider();

    appointmentService = new AppointmentService(
      fakeAppointmentRepository,
      fakeNotificationRepository,
      fakeCacheProvider,
    );
  });

  describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 10, 12).getTime();
      });

      const appointment = await appointmentService.create({
        date: new Date(2020, 4, 10, 13),
        providerId: '121212',
        userId: '121213',
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.providerId).toBe('121212');
    });

    it('should not be able to create a new appointment', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 10, 12).getTime();
      });

      const appointmentDate = new Date(2021, 3, 4, 10);

      await appointmentService.create({
        date: appointmentDate,
        providerId: '121212',
        userId: '121213',
      });

      await expect(
        appointmentService.create({
          date: appointmentDate,
          providerId: '121212',
          userId: '121213',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to create an appointment on a past date', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 10, 12).getTime();
      });

      await expect(
        appointmentService.create({
          date: new Date(2020, 4, 10, 11),
          providerId: '121212',
          userId: '121213',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to create an appointment with same user as provider', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 10, 12).getTime();
      });

      await expect(
        appointmentService.create({
          date: new Date(2020, 4, 10, 11),
          providerId: 'user-d',
          userId: 'user-id',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be able to create an appointment before 8am and 5pm', async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2020, 4, 10, 12).getTime();
      });

      await expect(
        appointmentService.create({
          date: new Date(2020, 4, 11, 7),
          providerId: 'provider-id',
          userId: 'user-d',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);

      await expect(
        appointmentService.create({
          date: new Date(2020, 4, 11, 18),
          providerId: 'user-d',
          userId: 'provider-id',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('GetAllAppointmentByProvider', () => {
    it('should be able to list the appointments on a specific day', async () => {
      const appointment1 = await fakeAppointmentRepository.create({
        date: new Date(2021, 3, 26, 9, 0, 0),
        providerId: 'provider-id',
        userId: 'user-d',
      });

      const appointment2 = await fakeAppointmentRepository.create({
        date: new Date(2021, 3, 26, 12, 0, 0),
        providerId: 'provider-id',
        userId: 'user-d',
      });

      const appointments = await appointmentService.findAllByProvider({
        providerId: 'provider-id',
        year: 2021,
        month: 4,
        day: 26,
      });

      expect(appointments).toEqual([appointment1, appointment2]);
    });
  });
});
