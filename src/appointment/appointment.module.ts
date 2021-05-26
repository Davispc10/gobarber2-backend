import { InfraNotificationModule } from 'src/notification/infra/typeorm/infra-notification.module';
import { InfraUserModule } from 'src/user/infra/typeorm/infra-user.module';

import { Module } from '@nestjs/common';

import { AppointmentController } from './infra/http/controllers/appointment.controller';
import { ProviderAvailabilityController } from './infra/http/controllers/provider-availability.controller';
import { ProviderController } from './infra/http/controllers/provider.controller';
import { InfraAppointmentModule } from './infra/typeorm/infra-appointment.module';
import { AppointmentService } from './services/appointment.service';
import { ProviderAvailabilityService } from './services/provider-availability.service';
import { ProviderService } from './services/provider.service';

@Module({
  imports: [InfraAppointmentModule, InfraUserModule, InfraNotificationModule],
  controllers: [
    AppointmentController,
    ProviderController,
    ProviderAvailabilityController,
  ],
  providers: [AppointmentService, ProviderService, ProviderAvailabilityService],
})
export class AppointmentModule {}
