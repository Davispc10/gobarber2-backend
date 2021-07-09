import { IAppointmentRepository } from '@appointment/interfaces/appointment.interface';
import { Inject, Injectable } from '@nestjs/common';

import { CreateNotificationDto } from './dtos/create-notification.dto';
import { UpdateNotificationDto } from './dtos/update-notification.dto';
import { INotificationRepository } from './interfaces/notification.interface';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    @Inject('IAppointmentRepository')
    private readonly notificationRepository: INotificationRepository,
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
