import { AppModule } from 'src/app.module';
import { SharedModule } from 'src/shared/shared.module';
import { InfraUserModule } from 'src/user/infra/typeorm/infra-user.module';

import { Module } from '@nestjs/common';

import { ForgotPasswordController } from './infra/http/controllers/forgot-password.controller';
import { ResetPasswordController } from './infra/http/controllers/reset-password.controller';
import { UserAvatarController } from './infra/http/controllers/user-avatar.controller';
import { UserProfileController } from './infra/http/controllers/user-profile.controller';
import { UserController } from './infra/http/controllers/user.controller';
import { HashProviderModule } from './providers/hash-provider.module';
import { EmailService } from './services/email.service';
import { PasswordService } from './services/password.service';
import { UpdateAvatarService } from './services/update-avatar.service';
import { UserService } from './services/user.service';

@Module({
  imports: [InfraUserModule, HashProviderModule, SharedModule],
  controllers: [
    UserController,
    UserAvatarController,
    ResetPasswordController,
    ForgotPasswordController,
    UserProfileController,
  ],
  providers: [UserService, UpdateAvatarService, EmailService, PasswordService],
})
export class UserModule {}
