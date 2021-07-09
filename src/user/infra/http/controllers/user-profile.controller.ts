import { classToClass } from 'class-transformer';

import {
  Controller,
  Body,
  Put,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Get,
} from '@nestjs/common';
import { IGetUser } from '@session/interfaces/getUserDecorator.interface';
import { GetUser } from '@session/user.decorator';
import { JwtAuthGuard } from '@shared/infra/guards/jwt-auth.guard';

import { UpdateUserDto } from '../../../dtos/update-user.dto';
import { UserService } from '../../../services/user.service';
import { User } from '../../typeorm/entities/user.entity';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  show(@GetUser() { user }: IGetUser): User {
    return classToClass(user);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async update(
    @GetUser() { user }: IGetUser,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userUpdated = await this.userService.update(user.id, updateUserDto);

    return classToClass(userUpdated);
  }
}
