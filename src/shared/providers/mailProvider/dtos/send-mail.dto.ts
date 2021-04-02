import { ParseMailTemplateDto } from '../../mailTemplateProvider/dtos/parse-mail-template.dto';

class MailContact {
  name: string;
  email: string;
}

export class SendMailDto {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplateDto;
}
