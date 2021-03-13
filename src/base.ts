import { PreviewGenerator } from './preview';
import { generateTitle } from './util/title';
import { SchemaValidator, SchemaOptions, SchemaField } from './types';
import { subgenerate, subgenerateMany } from './util/generate';

export abstract class BaseGenerator {
  protected _name: string;
  protected _title?: string;

  constructor(name: string, title?: string) {
    this._name = name;
    this._title = title;
  }

  title(title: string) {
    this._title = title;
    return this;
  }

  name(name: string) {
    this._name = name;
    return this;
  }
}

export abstract class StandardGenerator extends BaseGenerator {
  protected _type: string;
  protected _description?: string;
  protected _readOnly: boolean = false;
  protected _hidden: boolean = false;
  protected _options: SchemaOptions = {};
  protected _validation?: SchemaValidator;
  protected _preview?: PreviewGenerator;
  protected _fieldset?: string;

  constructor(type: string, name: string, title?: string) {
    super(name, title);
    this._type = type;
  }

  description(description: string) {
    this._description = description;
    return this;
  }

  readOnly(readOnly = true) {
    this._readOnly = readOnly;
    return this;
  }

  hidden(hidden = true) {
    this._hidden = hidden;
    return this;
  }

  validation(fn: SchemaValidator) {
    this._validation = fn;
    return this;
  }

  preview(preview: PreviewGenerator) {
    this._preview = preview;
    return this;
  }

  fieldset(fieldset: string) {
    this._fieldset = fieldset;
    return this;
  }

  options(options: SchemaOptions) {
    this._options = options;
    return this;
  }

  option(property: string, value: any) {
    this._options[property] = value;
    return this;
  }

  // @ts-ignore
  protected extendProperties(field: SchemaField) {}

  generate() {
    if (!this._type) throw Error('Type is required');
    const field: SchemaField = {
      type: this._type,
    };

    if (this._name) {
      field.name = this._name;
    }

    const title = generateTitle(this._name, this._title);
    if (title) {
      field.title = title;
    }

    if (this._description) {
      field.description = this._description;
    }
    if (this._readOnly) {
      field.readOnly = this._readOnly;
    }
    if (this._hidden) {
      field.hidden = this._hidden;
    }
    if (Object.keys(this._options).length > 0) {
      field.options = this._options;
    }
    if (this._validation) {
      field.validation = this._validation;
    }
    if (this._preview) {
      field.preview = this._preview;
    }
    if (this._fieldset) {
      field.fieldset = this._fieldset;
    }

    this.extendProperties(field);

    if (field.of) {
      field.of = subgenerateMany(field.of);
    }

    if (field.preview) {
      field.preview = subgenerate(field.preview);
    }

    return field;
  }
}

export abstract class GeneratorWithFields extends StandardGenerator {
  protected _fields: StandardGenerator[] = [];
  protected _predefinedFields: Record<string, any>;

  constructor(
    predefinedFields: Record<string, any> | undefined,
    type: string,
    name: string,
    title?: string,
  ) {
    super(type, name, title);
    this._predefinedFields = predefinedFields || {};
  }

  field(field: string | StandardGenerator) {
    // @TODO Better type checking?
    if (typeof field === 'object') {
      this._fields.push(field);
    } else if (typeof field === 'string') {
      if (Object.prototype.hasOwnProperty.call(this._predefinedFields, field)) {
        this._fields.push(this._predefinedFields[field]);
      } else {
        throw new Error(`Predefined field "${field}" not found.`);
      }
    }
    return this;
  }

  fields(fields: Array<string | StandardGenerator>) {
    fields.forEach(this.field, this);
    return this;
  }

  protected extendProperties(field: SchemaField) {
    if (this._fields.length) {
      field.fields = this._fields;
    }
  }

  generate() {
    const field = super.generate();

    if (field.fields) {
      field.fields = subgenerateMany(field.fields);
    }

    return field;
  }
}
