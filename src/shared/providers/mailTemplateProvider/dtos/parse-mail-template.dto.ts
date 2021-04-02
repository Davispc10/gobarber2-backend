class TemplateVariablesDto {
  [key: string]: string | number;
}

export class ParseMailTemplateDto {
  file: string;
  variables: TemplateVariablesDto;
}
