import { ProviderService } from 'src/appointment/services/provider.service';
import { IGetUser } from 'src/session/interfaces/getUserDecorator.interface';
import { GetUser } from 'src/session/user.decorator';
import { JwtAuthGuard } from 'src/shared/infra/guards/jwt-auth.guard';
import { User } from 'src/user/infra/typeorm/entities/user.entity';

import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('providers')
@UseGuards(JwtAuthGuard)
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async findAll(@GetUser() { user }: IGetUser): Promise<User[]> {
    return await this.providerService.findAll(user.id);
  }
}
