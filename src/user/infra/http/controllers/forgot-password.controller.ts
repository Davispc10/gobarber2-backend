import { Response } from 'express';
import { EmailService } from 'src/user/services/email.service';

import {
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
  Res,
  Body,
} from '@nestjs/common';

@Controller('password')
export class ForgotPasswordController {
  constructor(private readonly emailService: EmailService) {}

  @Post('forgot')
  @UsePipes(ValidationPipe)
  async create(
    @Body('email') email: string,
    @Res() res: Response,
  ): Promise<Response> {
    console.log(email);
    await this.emailService.sendForgotPasswordEmail({ email });

    return res.status(204).json();
  }
}
