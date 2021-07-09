import { Module } from '@nestjs/common';
import { InfraNotificationModule } from '@notification/infra/typeorm/infra-notification.module';
import { SharedModule } from '@shared/shared.module';
import { InfraUserModule } from '@user/infra/typeorm/infra-user.module';

import { AppointmentController } from './infra/http/controllers/appointment.controller';
import { ProviderAvailabilityController } from './infra/http/controllers/provider-availability.controller';
import { ProviderController } from './infra/http/controllers/provider.controller';
import { InfraAppointmentModule } from './infra/typeorm/infra-appointment.module';
import { AppointmentService } from './services/appointment.service';
import { ProviderAvailabilityService } from './services/provider-availability.service';
import { ProviderService } from './services/provider.service';

@Module({
  imports: [
    InfraAppointmentModule,
    InfraUserModule,
    InfraNotificationModule,
    SharedModule,
  ],
  controllers: [
    AppointmentController,
    ProviderController,
    ProviderAvailabilityController,
  ],
  providers: [AppointmentService, ProviderService, ProviderAvailabilityService],
})
export class AppointmentModule {}
