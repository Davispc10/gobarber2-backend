import { Response } from 'express';

import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Res,
  Body,
} from '@nestjs/common';
import { ForgotPasswordDto } from '@user/dtos/forgot-password.dto';
import { EmailService } from '@user/services/email.service';

@Controller('password')
export class ForgotPasswordController {
  constructor(private readonly emailService: EmailService) {}

  @Post('forgot')
  @UsePipes(ValidationPipe)
  async create(
    @Body() { email }: ForgotPasswordDto,
    @Res() res: Response,
  ): Promise<Response> {
    await this.emailService.sendForgotPasswordEmail({ email });

    return res.status(204).json();
  }
}
