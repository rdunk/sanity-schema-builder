import { GeneratorWithFields } from '../base';
import { PredefinedField } from '../types';

export class FieldGenerator extends GeneratorWithFields {
  constructor(
    predefinedFields: PredefinedField | undefined,
    type: string,
    name?: string,
    title?: string,
  ) {
    super(predefinedFields, type, name || type, title);
  }
}
