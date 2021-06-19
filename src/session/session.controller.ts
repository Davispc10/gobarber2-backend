import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

import { CreateSessionDto } from './dtos/create-session.dto';
import { IJwtToken } from './interfaces/jwtPayload.interface';
import { SessionService } from './session.service';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createSessionDto: CreateSessionDto): Promise<IJwtToken> {
    const userToken = await this.sessionService.create(createSessionDto);

    return userToken;
  }
}
