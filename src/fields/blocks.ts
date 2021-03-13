import { subgenerateMany } from '../util/generate';
import { StandardGenerator, GeneratorWithFields } from '../base';
import {
  PredefinedField,
  SchemaBlockList,
  SchemaBlockMarks,
  SchemaBlockStyle,
  SchemaField,
} from '../types';

export class BlockFieldGenerator extends StandardGenerator {
  protected _styles: SchemaBlockStyle[] = [];
  protected _lists: SchemaBlockList[] = [];
  protected _marks: SchemaBlockMarks = {};

  constructor(
    styles: SchemaBlockStyle[],
    lists: SchemaBlockList[],
    marks: SchemaBlockMarks,
  ) {
    super('block', '');
    this._styles = styles;
    this._lists = lists;
    this._marks = marks;
  }

  protected extendProperties(
    field: SchemaField & {
      styles: SchemaBlockStyle[];
      lists: SchemaBlockList[];
      marks: SchemaBlockMarks;
    },
  ) {
    if (this._styles.length) {
      field.styles = this._styles;
    }
    if (this._lists.length) {
      field.lists = this._lists;
    }
    if (Object.keys(this._marks).length > 0) {
      field.marks = this._marks;
    }
  }

  generate() {
    const field = super.generate() as SchemaField & {
      marks?: SchemaBlockMarks;
    };
    if (field.marks?.annotations) {
      field.marks.annotations = subgenerateMany(field.marks.annotations);
    }
    return field;
  }
}

export class BlocksFieldGenerator extends GeneratorWithFields {
  protected _styles: SchemaBlockStyle[] = [];
  protected _lists: SchemaBlockList[] = [];
  protected _marks: SchemaBlockMarks = {};

  constructor(
    predefinedFields: PredefinedField | undefined,
    name?: string,
    title?: string,
  ) {
    super(predefinedFields, 'array', name, title);
  }

  styles(styles: SchemaBlockStyle[]) {
    this._styles = styles;
    return this;
  }

  lists(lists: SchemaBlockList[]) {
    this._lists = lists;
    return this;
  }

  marks(marks: SchemaBlockMarks) {
    this._marks = marks;
    return this;
  }

  fields() {
    throw Error('Use the "of" method for blocks.');
    return this;
  }

  of(fields: Array<string | StandardGenerator>) {
    return super.fields(fields);
  }

  protected extendProperties(field: SchemaField) {
    this._fields.unshift(
      new BlockFieldGenerator(this._styles, this._lists, this._marks),
    );
    field.of = this._fields;
  }
}
