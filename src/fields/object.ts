import { subgenerateMany } from '../util/generate';
import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaField } from '../types';
import { FieldSetGenerator } from './fieldset';

export class ObjectFieldGenerator extends GeneratorWithFields {
  protected _fieldsets: FieldSetGenerator[] = [];
  protected _inputComponent: any; // @TODO type React?
  protected _options: {
    collapsible?: boolean;
    collapsed?: boolean;
  } = {};

  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    super(predefinedFields, 'object', name, title);
  }

  collapsible(isCollapsible: boolean) {
    this._options.collapsible = isCollapsible;
    return this;
  }

  collapsed(isCollapsed: boolean) {
    this._options.collapsed = isCollapsed;
    return this;
  }

  fieldsets(sets: FieldSetGenerator[]) {
    this._fieldsets = sets;
    return this;
  }

  inputComponent(component: any) {
    this._inputComponent = component;
    return this;
  }

  protected extendProperties(
    field: SchemaField & {
      fieldsets: FieldSetGenerator[];
      inputComponent: any;
    },
  ) {
    super.extendProperties(field);
    if (this._fieldsets.length) {
      field.fieldsets = this._fieldsets;
    }
    if (this._inputComponent) {
      field.inputComponent = this._inputComponent;
    }
  }

  generate() {
    const field = super.generate() as SchemaField & {
      fieldsets: FieldSetGenerator[];
    };

    if (field.fieldsets) {
      field.fieldsets = subgenerateMany(field.fieldsets);
    }

    return field;
  }
}
