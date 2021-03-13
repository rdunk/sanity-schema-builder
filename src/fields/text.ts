import { StandardGenerator } from '../base';
import { SchemaField } from '../types';

export class TextFieldGenerator extends StandardGenerator {
  _rows?: number;

  constructor(name: string, title?: string) {
    super('text', name, title);
  }

  rows(count: number) {
    this._rows = count;
    return this;
  }

  protected extendProperties(field: SchemaField & { rows?: number }) {
    if (this._rows) {
      field.rows = this._rows;
    }
  }
}
