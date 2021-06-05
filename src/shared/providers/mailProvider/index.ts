import { EtherealMailProvider } from './implementations/ethereal-mail.provider';
import { SESMailProvider } from './implementations/ses-mail.provider';

export const mailProviders = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};
