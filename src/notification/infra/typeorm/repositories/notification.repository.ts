import { CreateNotificationDto } from 'src/notification/dtos/create-notification.dto';
import { INotificationRepository } from 'src/notification/interfaces/notification.interface';
import { MongoRepository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Notification } from '../schemas/notification.schema';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification, 'mongo')
    private readonly notificationRepository: MongoRepository<Notification>,
  ) {}

  public async create({
    content,
    recipientId,
  }: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      content,
      recipientId,
    });

    await this.notificationRepository.save(notification);

    return notification;
  }
}
