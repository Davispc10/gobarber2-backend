import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from './entities/appointment.entity';
import { AppointmentRepository } from './repositories/appointment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [
    {
      provide: 'IAppointmentRepository',
      useClass: AppointmentRepository,
    },
  ],
  exports: ['IAppointmentRepository'],
})
export class TypeOrmInfraAppointmentModule {}
