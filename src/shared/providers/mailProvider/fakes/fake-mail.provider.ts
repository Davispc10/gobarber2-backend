import { SendMailDto } from '../dtos/send-mail.dto';
import { IMailProvider } from '../models/mail.provider';

export class FakeMailProvider implements IMailProvider {
  private messages: SendMailDto[] = [];

  public async sendMail(message: SendMailDto): Promise<void> {
    this.messages.push(message);
  }
}
