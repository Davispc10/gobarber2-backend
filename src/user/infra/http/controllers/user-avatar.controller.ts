import { uploadConfig } from 'src/config/upload.config';
import { IGetUser } from 'src/session/interfaces/getUserDecorator.interface';
import { GetUser } from 'src/session/user.decorator';
import { JwtAuthGuard } from 'src/shared/infra/guards/jwt-auth.guard';

import {
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateAvatarService } from '../../../services/update-avatar.service';
import { User } from '../../typeorm/entities/user.entity';

@Controller('users')
export class UserAvatarController {
  constructor(private readonly updateAvatarService: UpdateAvatarService) {}

  @Patch('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: uploadConfig.storage,
      fileFilter: uploadConfig.fileFilter,
    }),
  )
  async update(
    @UploadedFile() file,
    @GetUser() { user }: IGetUser,
  ): Promise<User> {
    return await this.updateAvatarService.updateAvatar(file.filename, user.id);
  }

  @Get('avatar/:path')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('path') pathImage: string, @Res() res): any {
    return res.sendFile(pathImage, { root: uploadConfig.uploadsFolder });
  }
}
