import { OrderingGenerator } from '../ordering';
import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField, SchemaIcon } from '../types';
import { subgenerateMany } from '../util/generate';

export class DocumentGenerator extends GeneratorWithFields {
  _liveEdit?: boolean;
  _orderings: OrderingGenerator[] = [];
  _icon?: SchemaIcon;

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

  extendProperties(
    field: SchemaField & {
      orderings?: OrderingGenerator[];
      icon?: any;
      liveEdit?: boolean;
    },
  ) {
    if (this._fields.length) {
      field.fields = this._fields;
    }
    if (this._orderings.length) {
      field.orderings = this._orderings;
    }
    if (this._icon) {
      field.icon = this._icon;
    }
    if (this._liveEdit) {
      field.liveEdit = true;
    }
  }

  generate() {
    const field = super.generate() as SchemaField & {
      orderings: OrderingGenerator[];
    };

    if (field.orderings) {
      field.orderings = subgenerateMany(field.orderings);
    }

    return field;
  }
}
