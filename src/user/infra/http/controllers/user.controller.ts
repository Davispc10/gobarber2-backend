import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@shared/infra/guards/jwt-auth.guard';

import { CreateUserDto } from '../../../dtos/create-user.dto';
import { UserService } from '../../../services/user.service';
import { User } from '../../typeorm/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Put(':id')
  // @UsePipes(ValidationPipe)
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
