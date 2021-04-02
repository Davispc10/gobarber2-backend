import { ParseMailTemplateDto } from '../dtos/parse-mail-template.dto';

export interface IMailTemplateProvider {
  parse(data: ParseMailTemplateDto): Promise<string>;
}
