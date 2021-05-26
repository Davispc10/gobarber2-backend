import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { INotificationRepository } from 'src/notification/interfaces/notification.interface';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';
import { Appointment } from '../infra/typeorm/entities/appointment.entity';
import {
  IAppointmentByProvider,
  IAppointmentCreate,
  IAppointmentRepository,
} from '../interfaces/appointment.interface';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
  ) {}

  public async create({
    date,
    userId,
    providerId,
  }: IAppointmentCreate): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new BadRequestException(
        "You can't create an appointment on a past date",
      );
    }

    if (userId === providerId) {
      throw new BadRequestException(
        "You can't create an appointment with the same provider and user",
      );
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new BadRequestException(
        'You can only create appointments between 8am and 5pm',
      );
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new BadRequestException('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      userId,
      providerId,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

    await this.notificationRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    return appointment;
  }

  public async findAllByProvider({
    providerId,
    day,
    month,
    year,
  }: IAppointmentByProvider): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        providerId,
        day,
        month,
        year,
      },
    );

    return appointments;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
