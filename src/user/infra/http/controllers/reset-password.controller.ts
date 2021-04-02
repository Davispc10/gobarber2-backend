import { Response } from 'express';
import { ResetPasswordDto } from 'src/user/dtos/reset-password.dto';
import { PasswordService } from 'src/user/services/password.service';

import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Res,
  Body,
} from '@nestjs/common';

@Controller('password')
export class ResetPasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('reset')
  @UsePipes(ValidationPipe)
  async create(
    @Body() { token, password }: ResetPasswordDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.passwordService.resetPassword({ token, password });

    return res.status(204).json();
  }
}
