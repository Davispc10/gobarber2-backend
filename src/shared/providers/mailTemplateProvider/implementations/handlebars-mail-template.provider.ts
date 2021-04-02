import { promises } from 'fs';
import handlebars from 'handlebars';

import { ParseMailTemplateDto } from '../dtos/parse-mail-template.dto';
import { IMailTemplateProvider } from '../models/mail-template.provider';

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: ParseMailTemplateDto): Promise<string> {
    const templateFileContent = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
