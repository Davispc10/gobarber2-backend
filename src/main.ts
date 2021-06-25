import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/common/filters/http-exception.filter';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(configService.get<number>('PORT') || 3331);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
