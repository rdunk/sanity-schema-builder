import { BaseGenerator } from './base';
import { SchemaOrder, SchemaOrdering } from './types';

export class OrderingGenerator extends BaseGenerator {
  protected _orders: SchemaOrder[];

  constructor(name: string, title?: string) {
    super(name, title);
    this._orders = [];
  }

  by(field: string, direction: string) {
    this._orders.push({ field, direction });
    return this;
  }

  generate() {
    if (!this._name) throw Error('Name is required');
    const ordering: SchemaOrdering = {
      name: this._name,
    };
    if (this._title) ordering.title = this._title;
    if (this._orders.length) ordering.by = this._orders;
    return ordering;
  }
}
