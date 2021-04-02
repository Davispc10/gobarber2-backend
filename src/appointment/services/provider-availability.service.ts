import { getDate, getDaysInMonth, getHours, isAfter } from 'date-fns';

import { Inject, Injectable } from '@nestjs/common';

import { IAppointmentRepository } from '../interfaces/appointment.interface';
import {
  IProviderAvailabilityDay,
  IProviderAvailabilityMonth,
  IResponseAvailabilityDay,
  IResponseAvailabilityMonth,
} from '../interfaces/provider-availability.interface';

@Injectable()
export class ProviderAvailabilityService {
  constructor(
    @Inject('IAppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  async month({
    providerId,
    month,
    year,
  }: IProviderAvailabilityMonth): Promise<IResponseAvailabilityMonth> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        providerId,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter((appointment) => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }

  async day({
    providerId,
    day,
    month,
    year,
  }: IProviderAvailabilityDay): Promise<IResponseAvailabilityDay> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        providerId,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}
