import { ConfigService } from '@nestjs/config';

export class FakeConfigService extends ConfigService {
  private expiresIn = 3600;

  public get(): number {
    return this.expiresIn;
  }
}
