import { SchemaNumberPredefined } from 'src/types';
import { StandardGenerator } from '../base';

export class NumberFieldGenerator extends StandardGenerator {
  protected _options: {
    list?: SchemaNumberPredefined[];
  } = {};

  constructor(name: string, title?: string) {
    super('number', name, title);
  }

  list(items: SchemaNumberPredefined[]) {
    this._options.list = items;
    return this;
  }
}
