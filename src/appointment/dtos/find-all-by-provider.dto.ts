import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class AppointmentByProviderDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsNumber()
  day: number;

  @IsNotEmpty()
  @IsNumber()
  month: number;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
