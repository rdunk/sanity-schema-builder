import {
  SchemaPreview,
  SchemaPreviewPrepare,
  SchemaPreviewComponent,
} from './types';

export class PreviewGenerator {
  _select: Record<string, string>;
  _prepare?: SchemaPreviewPrepare;
  _component?: SchemaPreviewComponent;

  constructor(select: Record<string, string> = {}) {
    this._select = select;
  }

  select(property: string, selection?: string) {
    selection = selection || property;
    this._select[property] = selection;
    return this;
  }

  prepare(fn: SchemaPreviewPrepare) {
    this._prepare = fn;
    return this;
  }

  component(component: SchemaPreviewComponent) {
    this._component = component;
    return this;
  }

  generate() {
    if (Object.keys(this._select).length > 0) {
      const preview: SchemaPreview = {
        select: this._select,
      };
      if (this._prepare) preview.prepare = this._prepare;
      if (this._component) preview.component = this._component;
      return preview;
    }
  }
}
