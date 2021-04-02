import { FindAllInDayFromProviderDto } from 'src/appointment/dtos/find-all-in-day-from-provider.dto';
import { FindAllInMonthFromProviderDto } from 'src/appointment/dtos/find-all-in-month-from-provider.dto';
import {
  IResponseAvailabilityDay,
  IResponseAvailabilityMonth,
} from 'src/appointment/interfaces/provider-availability.interface';
import { ProviderAvailabilityService } from 'src/appointment/services/provider-availability.service';
import { JwtAuthGuard } from 'src/shared/infra/guards/jwt-auth.guard';

import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';

@Controller('providers/:providerId')
@UseGuards(JwtAuthGuard)
export class ProviderAvailabilityController {
  constructor(
    private readonly providerAvailabilityService: ProviderAvailabilityService,
  ) {}

  @Get('month-available')
  async listMonth(
    @Param('providerId') providerId: string,
    @Body() { month, year }: FindAllInMonthFromProviderDto,
  ): Promise<IResponseAvailabilityMonth> {
    const availability = await this.providerAvailabilityService.month({
      providerId,
      month,
      year,
    });

    return availability;
  }

  @Get('day-available')
  async listDay(
    @Param('providerId') providerId: string,
    @Body() { month, year, day }: FindAllInDayFromProviderDto,
  ): Promise<IResponseAvailabilityDay> {
    const availability = await this.providerAvailabilityService.day({
      providerId,
      year,
      month,
      day,
    });

    return availability;
  }
}
