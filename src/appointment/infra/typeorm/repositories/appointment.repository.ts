import { Raw, Repository } from 'typeorm';

import { FindAllInDayFromProviderDto } from '@appointment/dtos/find-all-in-day-from-provider.dto';
import { FindAllInMonthFromProviderDto } from '@appointment/dtos/find-all-in-month-from-provider.dto';
import {
  IAppointmentCreate,
  IAppointmentRepository,
} from '@appointment/interfaces/appointment.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly ormRepository: Repository<Appointment>,
  ) {}

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: FindAllInMonthFromProviderDto): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: FindAllInDayFromProviderDto): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    date,
    userId,
    providerId,
  }: IAppointmentCreate): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date, userId });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAll(): Promise<Appointment[]> {
    return await this.ormRepository.find();
  }
}
