import { IsOptional } from 'class-validator';

export class FindAllProvidersDto {
  @IsOptional()
  exceptUserId: string;
}
