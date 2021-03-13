import { GeneratorWithFields } from '../base';
import { PredefinedField } from '../types';

export class FileFieldGenerator extends GeneratorWithFields {
  protected _options: {
    accept?: string;
    storeOriginalFilename?: boolean;
  } = {};

  constructor(
    predefinedFields: PredefinedField | undefined,
    name?: string,
    title?: string,
  ) {
    super(predefinedFields, 'file', name, title);
  }

  accept(accept: string) {
    this._options.accept = accept;
    return this;
  }

  storeOriginalFilename(storeOriginalFilename = true) {
    this._options.storeOriginalFilename = storeOriginalFilename;
    return this;
  }
}
