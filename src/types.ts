import { StandardGenerator } from './base';
import { PreviewGenerator } from './preview';

export type PredefinedField = Record<string, any>;

// @TODO type properly
export type SchemaValidator = (rule: any) => any;

// @TODO type properly
export type SchemaIcon = any;

// @TODO type properly
export type SchemaOptions = Record<string, any>;

// @TODO type properly
export type SchemaPreviewSelect = Record<string, string>;

// @TODO type properly
export type SchemaPreviewComponent = any;

// @TODO type properly
export type SchemaPreviewPrepare = (
  selected: Record<string, any>
) => Record<string, any>;

export interface SchemaPreview {
  select: SchemaPreviewSelect;
  prepare?: SchemaPreviewPrepare;
  component?: SchemaPreviewComponent;
}

export interface SchemaField {
  type: string;
  name?: string;
  title?: string | null;
  fieldset?: string;
  description?: string;
  readOnly?: boolean;
  hidden?: boolean;
  options?: SchemaOptions;
  validation?: SchemaValidator;
  preview?: PreviewGenerator;
  fields?: StandardGenerator[] | Record<string, any>;
  of?: StandardGenerator[] | Record<string, any>;
}

export interface SchemaOrder {
  field: string;
  direction: string;
}

export interface SchemaOrdering {
  name: string;
  title?: string;
  by?: SchemaOrder[];
}

export interface SchemaFieldset {
  name: string;
  title?: string | null;
  options?: {
    collapsible?: boolean;
    collapsed?: boolean;
    columns?: number;
  };
}

export type SchemaArrayLayout = 'tags' | 'grid';
export type SchemaArrayEditModal = 'dialog' | 'fullscreen' | 'popover';

export type SchemaArrayList = {
  title: string;
  value: string;
};

export interface SchemaObjectFieldset {
  name: string;
  title?: string;
  options?: {
    collapsible?: boolean;
    collapsed?: boolean;
    columns?: number;
  };
}

export type SchemaNumberPredefined =
  | number
  | {
      title: string;
      value: number;
    };

export type SchemaStringPredefined =
  | string
  | {
      title: string;
      value: string;
    };

export type SchemaBooleanLayout = 'switch' | 'checkbox';

export type SchemaStringLayout = 'dropdown' | 'radio';

export type SchemaStringDirection = 'horizontal' | 'vertical';

// @TODO type properly
export type SchemaReference = Record<string, any>;

// @TODO type properly
type SchemaReferenceFilterFn = (options: {
  object: any;
  parent: any;
  parentPath: string;
}) => Promise<{ filter: any; params: any }> | { filter: any; params: any };

export type SchemaReferenceFilter = SchemaReferenceFilterFn | string;

export type SchemaRefrenceFilterParams = Record<string, any>;

export interface SchemaBlockStyle {
  title: string;
  value: string;
}

export interface SchemaBlockList {
  title: string;
  value: string;
}

export interface SchemaBlockMarks {
  decorators?: {
    title: string;
    value: string;
    icon?: SchemaIcon;
  }[];
  annotations?: Array<StandardGenerator>;
}

export type SchemaSlugSlugify = (
  input: string,
  type: Record<string, any>
) => string;

export type SchemaImageMetadata = 'exif' | 'location' | 'lqip' | 'palette';
