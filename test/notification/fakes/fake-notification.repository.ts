import { ObjectID } from 'mongodb';
import { CreateNotificationDto } from 'src/notification/dtos/create-notification.dto';
import { Notification } from 'src/notification/infra/typeorm/schemas/notification.schema';
import { INotificationRepository } from 'src/notification/interfaces/notification.interface';

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
