# Sanity Schema Builder

### A more efficient way of writing schema for Sanity.io.

Sanity Schema Builder lets you write schema programmatically. You can use it for defining specific fields within your existing schema, or for generating entire document definitions. It's like the official [Structure Builder](https://www.sanity.io/docs/structure-builder-introduction), but for schema.

Writing complex schema can often involve a lot of repetition. The Sanity Schema Builder API gives you convenient methods that allow you to quickly define documents, fields, block text, previews, orderings, et al. It's written in TypeScript, so you get autocompletion suggestions as you write.

## TL;DR

Do this...

```ts
import SchemaBuilder from 'sanity-schema-builder';
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

## Installation

```bash
$ npm i sanity-schema-builder
```

Define your schema file:

```ts
import SchemaBuilder from 'sanity-schema-builder';

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
    S.str('nickname') // Use a shorthand alias
      .title('Also known as...'),  // Set the title using a method
    S.number('age')
      .description('Will be kept secret.'), // Add a generic field property
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
