import { subgenerateMany } from '../util/generate';
import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField } from '../types';
import { FieldSetGenerator } from './fieldset';

// @TODO support these:
// inputComponent
// preview

export class ObjectFieldGenerator extends GeneratorWithFields {
  _fieldsets: FieldSetGenerator[] = [];
  _options: {
    collapsible?: boolean;
    collapsed?: boolean;
  } = {};

  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    super(predefinedFields, 'object', name, title);
  }

  collapsible(isCollapsible: boolean) {
    this._options.collapsible = isCollapsible;
    return this;
  }

  collapsed(isCollapsed: boolean) {
    this._options.collapsed = isCollapsed;
    return this;
  }

  fieldsets(sets: FieldSetGenerator[]) {
    this._fieldsets = sets;
    return this;
  }

  extendProperties(field: SchemaField & { fieldsets: FieldSetGenerator[] }) {
    if (this._fields.length) {
      field.fields = this._fields;
    }
    if (this._fieldsets.length) {
      field.fieldsets = this._fieldsets;
    }
  }

  generate() {
    const field = super.generate() as SchemaField & {
      fieldsets: FieldSetGenerator[];
    };

    if (field.fieldsets) {
      field.fieldsets = subgenerateMany(field.fieldsets);
    }

    return field;
  }
}
