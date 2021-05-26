import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Match } from 'src/shared/decorators/match-password.decorator';

import { PartialType } from '@nestjs/mapped-types';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  oldPassword?: string;

  @ValidateIf((o) => o.oldPassword != null)
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ValidateIf((o) => o.password != null)
  @IsString()
  @IsNotEmpty()
  @Match('password')
  passwordConfirmation?: string;
}
