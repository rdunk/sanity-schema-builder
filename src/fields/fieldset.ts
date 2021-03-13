import { BaseGenerator } from '../base';
import { SchemaFieldset } from '../types';
import { generateTitle } from '../util/title';

export class FieldSetGenerator extends BaseGenerator {
  protected _options: {
    collapsible?: boolean;
    collapsed?: boolean;
    columns?: number;
  } = {};

  collapsible(isCollapsible: boolean) {
    this._options.collapsible = isCollapsible;
    return this;
  }

  collapsed(isCollapsed: boolean) {
    this._options.collapsed = isCollapsed;
    return this;
  }

  columns(count: number) {
    this._options.columns = count;
    return this;
  }

  generate() {
    const fieldset: SchemaFieldset = {
      name: this._name,
    };

    fieldset.title = generateTitle(this._name, this._title);

    if (Object.keys(this._options).length > 0) {
      fieldset.options = this._options;
    }

    return fieldset;
  }
}
