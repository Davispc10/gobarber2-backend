import {
  Transporter,
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';

import { IMailTemplateProvider } from '../../mailTemplateProvider/models/mail-template.provider';
import { SendMailDto } from '../dtos/send-mail.dto';
import { IMailProvider } from '../models/mail.provider';

Injectable();
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @Inject('IMailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.start();
  }

  private async start() {
    const account = await createTestAccount();

    const transporter = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: SendMailDto): Promise<void> {
    console.log('etherealllllllllllllllllllllll');

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', getTestMessageUrl(message));
  }
}
