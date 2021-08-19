import { OrderingGenerator } from '../ordering';
import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField, SchemaIcon } from '../types';
import { subgenerateMany } from '../util/generate';
import { FieldSetGenerator } from './fieldset';

export class DocumentGenerator extends GeneratorWithFields {
  protected _liveEdit?: boolean;
  protected _orderings: OrderingGenerator[] = [];
  protected _fieldsets: FieldSetGenerator[] = [];
  protected _icon?: SchemaIcon;

  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    super(predefinedFields, 'document', name, title);
  }

  liveEdit(liveEdit = true) {
    this._liveEdit = liveEdit;
    return this;
  }

  icon(icon: SchemaIcon) {
    this._icon = icon;
    return this;
  }

  orderings(orderings: OrderingGenerator[]) {
    this._orderings = orderings;
    return this;
  }

  fieldsets(sets: FieldSetGenerator[]) {
    this._fieldsets = sets;
    return this;
  }

  protected extendProperties(
    field: SchemaField & {
      orderings?: OrderingGenerator[];
      icon?: any;
      liveEdit?: boolean;
      fieldsets: FieldSetGenerator[];
    },
  ) {
    super.extendProperties(field);
    if (this._orderings.length) {
      field.orderings = this._orderings;
    }
    if (this._icon) {
      field.icon = this._icon;
    }
    if (this._liveEdit) {
      field.liveEdit = true;
    }
    if (this._fieldsets.length) {
      field.fieldsets = this._fieldsets;
    }
  }

  generate() {
    const field = super.generate() as SchemaField & {
      fieldsets: FieldSetGenerator[];
      orderings: OrderingGenerator[];
    };

    if (field.orderings) {
      field.orderings = subgenerateMany(field.orderings);
    }

    if (field.fieldsets) {
      field.fieldsets = subgenerateMany(field.fieldsets);
    }

    return field;
  }
}
