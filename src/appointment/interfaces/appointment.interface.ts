import { FindAllInDayFromProviderDto } from '../dtos/find-all-in-day-from-provider.dto';
import { FindAllInMonthFromProviderDto } from '../dtos/find-all-in-month-from-provider.dto';
import { Appointment } from '../infra/typeorm/entities/appointment.entity';

export interface IAppointmentCreate {
  providerId: string;
  userId: string;
  date: Date;
}

export interface IAppointmentByProvider {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

export interface IAppointmentRepository {
  create(appointmentCreate: IAppointmentCreate): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAll(): Promise<Appointment[]>;
  findAllInMonthFromProvider(
    data: FindAllInMonthFromProviderDto,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: FindAllInDayFromProviderDto,
  ): Promise<Appointment[]>;
}
