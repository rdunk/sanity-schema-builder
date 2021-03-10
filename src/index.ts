import {
  ArrayFieldGenerator,
  BlocksFieldGenerator,
  BooleanFieldGenerator,
  DateFieldGenerator,
  DatetimeFieldGenerator,
  DocumentGenerator,
  FieldGenerator,
  FieldSetGenerator,
  FileFieldGenerator,
  GeopointFieldGenerator,
  ImageFieldGenerator,
  NumberFieldGenerator,
  ObjectFieldGenerator,
  ReferenceFieldGenerator,
  SlugFieldGenerator,
  StringFieldGenerator,
  TextFieldGenerator,
  UrlFieldGenerator,
} from './fields';
import { OrderingGenerator } from './ordering';
import { PreviewGenerator } from './preview';
import { PredefinedField } from './types';

export default class SchemaBuilder {
  private _predefinedFields: Record<string, PredefinedField>;

  constructor(predefinedFields?: Record<string, any>) {
    this._predefinedFields = predefinedFields || {};
  }

  define(key: string, field: PredefinedField) {
    this._predefinedFields[key] = field;
  }

  // Base
  f = this.field;
  field(type: string, name?: string, title?: string) {
    return new FieldGenerator(this._predefinedFields, type, name, title);
  }
  // Field types
  arr = this.array;
  array(name: string, title?: string) {
    return new ArrayFieldGenerator(this._predefinedFields, name, title);
  }
  blocks(name: string, title?: string) {
    return new BlocksFieldGenerator(this._predefinedFields, name, title);
  }
  bool = this.boolean;
  boolean(name: string, title?: string) {
    return new BooleanFieldGenerator(name, title);
  }
  date(name: string, title?: string) {
    return new DateFieldGenerator(name, title);
  }
  dt = this.datetime;
  datetime(name: string, title?: string) {
    return new DatetimeFieldGenerator(name, title);
  }
  doc = this.document;
  document(name: string, title?: string) {
    return new DocumentGenerator(this._predefinedFields, name, title);
  }
  fset = this.fieldset;
  fieldset(name: string, title?: string) {
    return new FieldSetGenerator(name, title);
  }
  file(name: string, title?: string) {
    return new FileFieldGenerator(this._predefinedFields, name, title);
  }
  geo = this.geopoint;
  geopoint(name: string, title?: string) {
    return new GeopointFieldGenerator(name, title);
  }
  img = this.image;
  image(name: string, title?: string) {
    return new ImageFieldGenerator(this._predefinedFields, name, title);
  }
  num = this.number;
  number(name: string, title?: string) {
    return new NumberFieldGenerator(name, title);
  }
  obj = this.object;
  object(name: string, title?: string) {
    return new ObjectFieldGenerator(this._predefinedFields, name, title);
  }
  ref = this.reference;
  reference(name: string, title?: string) {
    return new ReferenceFieldGenerator(name, title);
  }
  slug(name: string, title?: string) {
    return new SlugFieldGenerator(name, title);
  }
  str = this.string;
  string(name: string, title?: string) {
    return new StringFieldGenerator(name, title);
  }
  text(name: string, title?: string) {
    return new TextFieldGenerator(name, title);
  }
  url(name: string, title?: string) {
    return new UrlFieldGenerator(name, title);
  }
  // Orderings
  sort = this.ordering;
  ordering(name: string, title?: string) {
    return new OrderingGenerator(name, title);
  }
  // Preview
  view = this.ordering;
  preview(select?: Record<string, string>) {
    return new PreviewGenerator(select);
  }
}
