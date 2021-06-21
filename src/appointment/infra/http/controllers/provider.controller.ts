import { ProviderService } from '@appointment/services/provider.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { IGetUser } from '@session/interfaces/getUserDecorator.interface';
import { GetUser } from '@session/user.decorator';
import { JwtAuthGuard } from '@shared/infra/guards/jwt-auth.guard';
import { User } from '@user/infra/typeorm/entities/user.entity';

@Controller('providers')
@UseGuards(JwtAuthGuard)
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  async findAll(@GetUser() { user }: IGetUser): Promise<User[]> {
    return await this.providerService.findAll(user.id);
  }
}
