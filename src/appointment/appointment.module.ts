import { TypeOrmInfraUserModule } from 'src/user/infra/typeorm/typeorm-infra-user.module';

import { Module } from '@nestjs/common';

import { AppointmentController } from './infra/http/controllers/appointment.controller';
import { ProviderAvailabilityController } from './infra/http/controllers/provider-availability.controller';
import { ProviderController } from './infra/http/controllers/provider.controller';
import { TypeOrmInfraAppointmentModule } from './infra/typeorm/typeorm-infra-appointment.module';
import { AppointmentService } from './services/appointment.service';
import { ProviderAvailabilityService } from './services/provider-availability.service';
import { ProviderService } from './services/provider.service';

@Module({
  imports: [TypeOrmInfraAppointmentModule, TypeOrmInfraUserModule],
  controllers: [
    AppointmentController,
    ProviderController,
    ProviderAvailabilityController,
  ],
  providers: [AppointmentService, ProviderService, ProviderAvailabilityService],
})
export class AppointmentModule {}
