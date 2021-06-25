import { SES } from 'aws-sdk';
import { Transporter, createTransport } from 'nodemailer';

import { mailConfig } from '@config/mail.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IMailTemplateProvider } from '../../mailTemplateProvider/models/mail-template.provider';
import { SendMailDto } from '../dtos/send-mail.dto';
import { IMailProvider } from '../models/mail.provider';

const configService = new ConfigService();

Injectable();
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @Inject('IMailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.start();
  }

  private async start() {
    const transporter = createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });

    this.client = transporter;
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: SendMailDto): Promise<void> {
    console.log('opaa sessssssssssssssssss');

    const { email, name } = mailConfig(configService).defaults.from;

    console.log('999999999999999999999');
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
