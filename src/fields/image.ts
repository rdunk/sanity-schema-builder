import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField } from '../types';

const alt = {
  name: 'alt',
  title: 'Alt Text',
  type: 'string',
};

const caption = {
  name: 'caption',
  title: 'Caption',
  type: 'array',
  of: [{ type: 'block' }],
};

export class ImageFieldGenerator extends GeneratorWithFields {
  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    super(predefinedFields, 'image', name, title);
    this._predefinedFields = {
      alt,
      caption,
    };
  }

  extendProperties(field: SchemaField) {
    if (this._fields.length) field.fields = this._fields;
  }
}
