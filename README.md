<div align="center">
	<h1>Sanity Schema Builder</h1>
  <p>
    <img alt="NPM version" src="https://img.shields.io/npm/v/sanity-schema-builder?color=000&style=flat-square">
    <img alt="NPM downloads" src="https://img.shields.io/npm/dm/sanity-schema-builder?color=000&style=flat-square">
    <img alt="GitHub Release Date" src="https://img.shields.io/github/release-date/rdunk/sanity-schema-builder?color=000&style=flat-square">
    <img alt="License" src="https://img.shields.io/npm/l/sanity-schema-builder.svg?color=000&style=flat-square">
    </p>
	</p>
	<p>
		<h3>A more efficient way of writing schema for Sanity.io.</h3>
	<br>
	<br>
</div>

Sanity Schema Builder lets you write schema programmatically. You can use it for defining specific fields within your existing schema, or for generating entire document definitions. It's like the official [Structure Builder](https://www.sanity.io/docs/structure-builder-introduction), but for schema.

Writing complex schema can often involve a lot of repetition. The Sanity Schema Builder API exposes convenient methods that allow you to quickly define documents, fields, block text, previews, orderings, et al. It's written in TypeScript, so you can benefit from automatic suggestions as you write.

## TL;DR

Do this...

```ts
import { SchemaBuilder } from 'sanity-schema-builder';
import { OkHandIcon } from '@sanity/icons';
const S = new SchemaBuilder();

export default S.doc('person')
  .icon(OkHandIcon)
  .fields([S.str('firstName'), S.str('lastName'), S.num('age')])
  .generate();
```

Instead of this...

```ts
import { OkHandIcon } from '@sanity/icons';

export default {
  type: 'document',
  name: 'person',
  title: 'Person',
  icon: OkHandIcon,
  fields: [
    {
      type: 'string',
      name: 'firstName',
      title: 'First Name',
    },
    {
      type: 'string',
      name: 'lastName',
      title: 'Last Name',
    },
    {
      type: 'number',
      name: 'age',
      title: 'Age',
    },
  ],
};
```

## Install

```bash
$ npm i sanity-schema-builder # or yarn add sanity-schema-builder
```

## Usage

```ts
import { SchemaBuilder } from 'sanity-schema-builder';

const S = new SchemaBuilder();

export default S.document('person')
  /* Go wild here */
  .generate();
```

## Detailed example

The `SchemaBuilder` class aims to make it slightly easier for you to write your schema. It offers chainable and nestable methods as shorthand alternatives to defining longer form schema objects. Each time you would normally define a new object, you can instead use a method.

Below is an example of a document schema with multiple fields of different types, each with their own properties and options, as well as a custom preview and orderings. Of course there are many more methods available, see the "Available Schema Types" section.

```ts
const document = S.document('person') // Create a new document
  .fields([ // Add some fields to the document
    S.string('firstName'), // A basic string with the name 'firstName'. A title of 'First Name' will be generated.
    S.string('lastName', 'Family Name'), // Define the title explicitly
    S.str('nickname') // Use the "str" shorthand alias
      .title('Also known as...'),  // Set the title using a method
    S.number('age')
      .description('Will be kept secret.'), // Add a description (a generic field property)
    S.geopoint('location')
      .readOnly()
      .hidden(), // Chain multiple properties
    S.array('pets').of([ // Create an array of objects
      S.object('pet').fields([ // Each object may have an array of fields
        S.string('species')
          .list(['Dog', 'Cat', 'Axolotl']) // Add a field specific option
          .layout('radio'), // Chain multiple options
        S.image('photo')
          .options({ hotspot: true, storeOriginalFilename: true }), // Set options explicitly
      ]),
    ]),
    S.reference('memberOf')
      .to(['team', 'group']) // Define an array of references
      .add('department'), // Or add references individually
    S.field('table', 'measurements'), // Define a custom field of type 'table'
    S.slug('handle')
      .validation(Rule => Rule.required()), // Use validation
  ])
  .icon(SomeImportedIcon) // Define an icon used by the studio for this document type
  .preview(
    S.preview() // Use a nested preview method
      .select('firstName').select('lastName').select('alias', 'nickname') // Chain selections
      .prepare((selection) => ({ // Use a prepare function
        title: `${firstName} ${lastName}`,
        subtitle: selection.alias,
      }));
  )
  .orderings([ // Use an array of nested orderings
    S.ordering('age').by('age', 'desc'),
    S.ordering('name').by('lastName', 'asc').by('firstName', 'asc'), // Add multiple sorts
  ])
  .generate(); // IMPORTANT! Don't forget to actually generate the schema
```

You don't have to just generate documents in this way. For example, you may want to generate a reusable field:

```ts
const field = S.obj('metadata')
  .fields([
    S.str('title'),
    S.str('description'),
    S.url('canonical'),
    S.img('image'),
  ])
  .generate();
```

## Available Schema Types

Sanity Schema Builder supports all of the standard schema types listed [in the official documentation](https://www.sanity.io/docs/schema-types). These types are all available as methods on a `SchemaBuilder` class instance, as well as via their alias. e.g. `S.string()` or `S.str()`.

| Type      | Alias | Description                                                           |
| --------- | ----- | --------------------------------------------------------------------- |
| array     | arr   | An array of other types.                                              |
| blocks    |       | An array of block content (and other types).                          |
| boolean   | bool  | Either `true` or `false`.                                             |
| date      |       | An ISO-8601 formatted string containing date.                         |
| datetime  | dt    | An ISO-8601 formatted string UTC containing date and time.            |
| document  | doc   | The base schema type for Sanity Studio.                               |
| file      |       | An object with a reference to a file asset.                           |
| geopoint  | geo   | An object signifying a global latitude/longitude/altitude coordinate. |
| image     | img   | An object with a reference to an image asset.                         |
| number    | num   | A number.                                                             |
| object    | obj   | For defining custom types that contain other fields.                  |
| reference | ref   | A reference to another document.                                      |
| slug      |       | A slug, typically for URLs.                                           |
| string    | str   | A string, or selectable list of strings.                              |
| text      |       | A basic multi-line string.                                            |
| url       |       | A string representing a URL.                                          |

In addition, the following methods and aliases are available for more specific or nested functionality:

| Type     | Alias | Description                                                                                              |
| -------- | ----- | -------------------------------------------------------------------------------------------------------- |
| field    | f     | Low-level method for specifying custom field types.                                                      |
| fieldset | fset  | For defining [fieldsets](https://www.sanity.io/docs/object-type#fieldsets) inside documents and objects. |
| ordering | sort  | For defining [sort orders](https://www.sanity.io/docs/sort-orders).                                      |
| preview  | view  | For defining [previews](https://www.sanity.io/docs/previews-list-views).                                 |
| generate |       | Generates the schema. All schema type chains must end with this method.                                  |

## Predefined fields

You can pass the schema builder predefined fields which you can then reference as strings when adding sub-fields to objects or other object-like fields. These can be generated using the Schema builder or written manually.

Predefined fields can be passed to the SchemaBuilder constructor, or added after initialization using the `define` method.

```ts
// Pass in via the constructor
const S = new SchemaBuilder({
  title: {
    type: 'string',
    name: 'title',
    title: 'Title',
  },
});
// Or using the define method
S.define('name', S.str('name').generate());
// Create an array of predefined fields
const someArray = S.arr().of(['title', 'name']);
```

## Contributing

Contributions are welcome, some ideas of things to help with:

- Specific documentation for each class method.
- Some types could be improved, check `@TODO` comments in the source code.
- Test coverage could be expanded, especially for some of the higher-order methods.

## License

MIT
