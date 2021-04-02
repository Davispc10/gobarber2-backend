import { IMailTemplateProvider } from '../models/mail-template.provider';

export class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}
