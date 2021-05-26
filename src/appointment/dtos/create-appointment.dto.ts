import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  date: string;
}
