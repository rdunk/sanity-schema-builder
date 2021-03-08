import { SchemaSlugSlugify } from 'src/types';
import { StandardGenerator } from '../base';

export class SlugFieldGenerator extends StandardGenerator {
  _options: {
    source?: string;
    maxLength?: number;
    slugify?: SchemaSlugSlugify;
    isUnique?: () => any;
  } = {};

  constructor(name: string, title?: string) {
    super('slug', name, title);
  }

  source(source: string) {
    this._options.source = source;
    return this;
  }

  maxLength(maxLength: number) {
    this._options.maxLength = maxLength;
    return this;
  }

  slugify(slugifyFn: SchemaSlugSlugify) {
    this._options.slugify = slugifyFn;
    return this;
  }

  isUnique(fn: () => any) {
    this._options.isUnique = fn;
    return this;
  }
}
