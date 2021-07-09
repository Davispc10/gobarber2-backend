import { Response } from 'express';

import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Res,
  Body,
} from '@nestjs/common';
import { ResetPasswordDto } from '@user/dtos/reset-password.dto';
import { PasswordService } from '@user/services/password.service';

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
