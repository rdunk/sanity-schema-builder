import { StandardGenerator } from '../base';
import {
  SchemaField,
  SchemaReference,
  SchemaReferenceFilter,
  SchemaRefrenceFilterParams,
} from '../types';

export class ReferenceFieldGenerator extends StandardGenerator {
  protected _references: SchemaReference[] = [];
  protected _filter: SchemaReferenceFilter = '';
  protected _filterParams?: SchemaRefrenceFilterParams = undefined;
  protected _weak?: boolean;

  constructor(name: string, title?: string) {
    super('reference', name, title);
  }

  add(reference: SchemaReference | string) {
    if (typeof reference === 'string') {
      this._references.push({ type: reference });
    } else if (typeof reference === 'object') {
      this._references.push(reference);
    }
    return this;
  }

  filter(filter: SchemaReferenceFilter, params: SchemaRefrenceFilterParams) {
    // groq string or function
    this._filter = filter;
    this._filterParams = params;
    return this;
  }

  to(references: SchemaReference[]) {
    this._references = references;
    return this;
  }

  weak(isWeak = true) {
    this._weak = isWeak;
    return this;
  }

  protected extendProperties(
    field: SchemaField & { to?: SchemaReference[]; weak?: boolean },
  ) {
    if (this._weak !== undefined) {
      field.weak = this._weak;
    }
    if (this._references.length) {
      field.to = this._references;
    }
    if (this._filter) {
      field.options = {
        filter: this._filter,
      };
      if (this._filterParams) {
        field.options.filterParams = this._filterParams;
      }
    }
  }
}
