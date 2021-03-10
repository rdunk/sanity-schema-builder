import { StandardGenerator, GeneratorWithFields } from '../base';
import {
  PredefinedField,
  SchemaArrayLayout,
  SchemaArrayList,
  SchemaField,
  SchemaArrayEditModal,
} from '../types';

export class ArrayFieldGenerator extends GeneratorWithFields {
  _options: {
    sortable?: boolean;
    layout?: SchemaArrayLayout;
    list?: SchemaArrayList[];
    editModal?: SchemaArrayEditModal;
  } = {};

  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    super(predefinedFields, 'array', name, title);
  }

  fields() {
    throw Error('Use the "of" method for arrays.');
    return this;
  }

  of(fields: string | Array<string | StandardGenerator>) {
    return super.fields(fields);
  }

  sortable(sortable: boolean) {
    this._options.sortable = sortable;
    return this;
  }

  layout(layout: SchemaArrayLayout) {
    this._options.layout = layout;
    return this;
  }

  list(items: SchemaArrayList[]) {
    this._options.list = items;
    return this;
  }

  editModal(editModal: SchemaArrayEditModal) {
    this._options.editModal = editModal;
    return this;
  }

  extendProperties(field: SchemaField) {
    if (this._fields.length) field.of = this._fields;
  }
}
