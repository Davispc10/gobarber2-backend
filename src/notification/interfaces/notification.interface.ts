import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { Notification } from '../infra/typeorm/schemas/notification.schema';

export interface INotificationRepository {
  create(data: CreateNotificationDto): Promise<Notification>;
}
