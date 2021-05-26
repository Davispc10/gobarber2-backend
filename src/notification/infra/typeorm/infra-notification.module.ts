import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationRepository } from './repositories/notification.repository';
import { Notification } from './schemas/notification.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Notification], 'mongo')],
  providers: [
    {
      provide: 'INotificationRepository',
      useClass: NotificationRepository,
    },
  ],
  exports: ['INotificationRepository'],
})
export class InfraNotificationModule {}
