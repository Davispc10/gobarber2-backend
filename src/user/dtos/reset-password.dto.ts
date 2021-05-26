import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Match } from 'src/shared/decorators/match-password.decorator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password')
  passwordConfirmation: string;
}
