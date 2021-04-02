import { parseISO } from 'date-fns';
import { AppointmentByProviderDto } from 'src/appointment/dtos/find-all-by-provider.dto';
import { GetUser } from 'src/session/user.decorator';
import { JwtAuthGuard } from 'src/shared/infra/guards/jwt-auth.guard';
import { User } from 'src/user/infra/typeorm/entities/user.entity';

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { CreateAppointmentDto } from '../../../dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../../../dtos/update-appointment.dto';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../typeorm/entities/appointment.entity';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @GetUser() user: User,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const date = parseISO(createAppointmentDto.date);

    return await this.appointmentService.create({
      date,
      userId: user.id,
      providerId: createAppointmentDto.providerId,
    });
  }

  @Get('me')
  async findAllByProvider(
    @Body() { providerId, day, month, year }: AppointmentByProviderDto,
  ): Promise<Appointment[]> {
    return await this.appointmentService.findAllByProvider({
      providerId,
      day,
      month,
      year,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
