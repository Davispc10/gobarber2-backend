import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class FindAllInMonthFromProviderDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsNumber()
  @IsNotEmpty()
  month: number;

  @IsNumber()
  @IsNotEmpty()
  year: number;
}
