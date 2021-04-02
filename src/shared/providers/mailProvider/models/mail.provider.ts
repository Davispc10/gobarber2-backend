import { SendMailDto } from '../dtos/send-mail.dto';

export interface IMailProvider {
  sendMail(data: SendMailDto): Promise<void>;
}
