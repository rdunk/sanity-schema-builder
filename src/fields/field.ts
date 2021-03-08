import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField } from '../types';

export class FieldGenerator extends GeneratorWithFields {
  constructor(
    predefinedFields: PredefinedField | undefined,
    type: string,
    name?: string,
    title?: string,
  ) {
    super(predefinedFields, type, name || type, title);
  }

  extendProperties(field: SchemaField) {
    if (this._fields.length) {
      field.fields = this._fields;
    }
  }
}
