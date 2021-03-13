import { StandardGenerator } from '../base';
import { SchemaBooleanLayout } from '../types';

export class BooleanFieldGenerator extends StandardGenerator {
  protected _options: {
    layout?: SchemaBooleanLayout;
  } = {};

  constructor(name?: string, title?: string) {
    super('boolean', name, title);
  }

  layout(layout: SchemaBooleanLayout) {
    this._options.layout = layout;
    return this;
  }
}
