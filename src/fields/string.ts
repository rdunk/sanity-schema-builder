import { StandardGenerator } from '../base';
import {
  SchemaStringPredefined,
  SchemaStringLayout,
  SchemaStringDirection,
} from '../types';

export class StringFieldGenerator extends StandardGenerator {
  protected _options: {
    list?: SchemaStringPredefined[];
    layout?: SchemaStringLayout;
    direction?: SchemaStringDirection;
  } = {};

  constructor(name?: string, title?: string) {
    super('string', name, title);
  }

  list(items: SchemaStringPredefined[]) {
    this._options.list = items;
    return this;
  }

  layout(layout: SchemaStringLayout) {
    this._options.layout = layout;
    return this;
  }

  direction(direction: SchemaStringDirection) {
    this._options.direction = direction;
    return this;
  }
}
