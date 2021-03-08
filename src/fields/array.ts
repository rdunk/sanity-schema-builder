import { StandardGenerator, GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField } from '../types';

export class ArrayFieldGenerator extends GeneratorWithFields {
  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    const type = 'array';
    super(predefinedFields, type, name, title);
  }

  fields() {
    throw Error('Use the "of" method for arrays.');
    return this;
  }

  of(fields: string | Array<string | StandardGenerator>) {
    return super.fields(fields);
  }

  extendProperties(field: SchemaField) {
    if (this._fields.length) field.of = this._fields;
  }
}
