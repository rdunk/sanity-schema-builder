import { GeneratorWithFields } from '../base';
import { PredefinedField, SchemaImageMetadata } from '../types';

const alt = {
  name: 'alt',
  title: 'Alt Text',
  type: 'string',
};

const caption = {
  name: 'caption',
  title: 'Caption',
  type: 'array',
  of: [{ type: 'block' }],
};

export class ImageFieldGenerator extends GeneratorWithFields {
  protected _options: {
    metadata?: SchemaImageMetadata[];
    hotspot?: boolean;
    storeOriginalFilename?: boolean;
    accept?: string;
    sources?: any[]; // @TODO Improve type
  } = {};

  constructor(
    predefinedFields: PredefinedField | undefined,
    name: string,
    title?: string,
  ) {
    super(predefinedFields, 'image', name, title);
    this._predefinedFields = {
      alt,
      caption,
    };
  }

  metadata(metadata: SchemaImageMetadata[]) {
    this._options.metadata = metadata;
    return this;
  }

  hotspot(hotspot = true) {
    this._options.hotspot = hotspot;
    return this;
  }

  storeOriginalFilename(store = true) {
    this._options.storeOriginalFilename = store;
    return this;
  }

  accept(mimeType: string) {
    this._options.accept = mimeType;
    return this;
  }

  sources(sources: any[]) {
    this._options.sources = sources;
    return this;
  }
}
