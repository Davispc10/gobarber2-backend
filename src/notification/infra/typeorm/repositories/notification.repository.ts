import { CreateNotificationDto } from 'src/notification/dto/create-notification.dto';
import { INotificationRepository } from 'src/notification/interfaces/notification.interface';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Notification } from '../schemas/notification.schema';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(
    @InjectRepository(Notification)
    private readonly ormRepository: Repository<Notification>,
  ) {}

  public async create({
    content,
    recipientId,
  }: CreateNotificationDto): Promise<Notification> {
    const notification = this.ormRepository.create({ content, recipientId });

    await this.ormRepository.save(notification);

    return notification;
  }
}
