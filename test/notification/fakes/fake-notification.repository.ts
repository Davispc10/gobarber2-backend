import { ObjectID } from 'mongodb';

import { CreateNotificationDto } from '@notification/dtos/create-notification.dto';
import { Notification } from '@notification/infra/typeorm/schemas/notification.schema';
import { INotificationRepository } from '@notification/interfaces/notification.interface';

export class FakeNotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipientId,
  }: CreateNotificationDto): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipientId });

    this.notifications.push(notification);

    return notification;
  }
}
