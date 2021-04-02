import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { FindAllInDayFromProviderDto } from 'src/appointment/dtos/find-all-in-day-from-provider.dto';
import { FindAllInMonthFromProviderDto } from 'src/appointment/dtos/find-all-in-month-from-provider.dto';
import { Appointment } from 'src/appointment/infra/typeorm/entities/appointment.entity';
import {
  IAppointmentCreate,
  IAppointmentRepository,
} from 'src/appointment/interfaces/appointment.interface';
import { v4 as uuidv4 } from 'uuid';

export class FakeAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: FindAllInMonthFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: FindAllInDayFromProviderDto): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.providerId === providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({
    date,
    userId,
    providerId,
  }: IAppointmentCreate): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidv4(), date, providerId, userId });

    this.appointments.push(appointment);
    return appointment;
  }

  public async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }
}
