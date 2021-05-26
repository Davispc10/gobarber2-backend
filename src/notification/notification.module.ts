import { InfraAppointmentModule } from 'src/appointment/infra/typeorm/infra-appointment.module';

import { Module } from '@nestjs/common';

import { InfraNotificationModule } from './infra/typeorm/infra-notification.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    InfraNotificationModule,
    InfraAppointmentModule,
    InfraNotificationModule,
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
