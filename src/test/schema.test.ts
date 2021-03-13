import SchemaBuilder from '../index';

const S = new SchemaBuilder();

test('generates a field using low-level field generator', () => {
  const schema = {
    type: 'string',
    name: 'testBasic',
    title: 'A Basic String',
    description: 'This is just a string.',
  };
  const generated = S.field('string', 'testBasic', 'A Basic String')
    .description('This is just a string.')
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('adds readonly property', () => {
  const schema = {
    type: 'string',
    name: 'testReadOnly',
    title: 'Test Read only',
    readOnly: true,
  };
  const generated = S.str('testReadOnly').readOnly(true).generate();
  expect(generated).toStrictEqual(schema);
});

test('adds readonly property', () => {
  const schema = {
    type: 'string',
    name: 'testHidden',
    title: 'Test Hidden',
    hidden: true,
  };
  const generated = S.str('testHidden').hidden(true).generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a title automatically if not supplied', () => {
  const schema = {
    type: 'string',
    name: 'testTitle',
    title: 'Test Title',
  };
  const generated = S.field('string', 'testTitle').generate();
  expect(generated).toStrictEqual(schema);
});

test('generates without a title if explicitly set to an empty string', () => {
  const schema = {
    type: 'string',
    name: 'testNoTitle',
  };
  const generated = S.field('string', 'testNoTitle', '').generate();
  expect(generated).toStrictEqual(schema);
});

test('set name and title via method', () => {
  const schema = {
    type: 'string',
    name: 'testName',
    title: 'A Custom Title',
  };
  const generated = S.string('')
    .name('testName')
    .title('A Custom Title')
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a document', () => {
  const schema = {
    type: 'document',
    name: 'testDocument',
    title: 'Test Document',
    liveEdit: true,
  };
  const generated = S.doc('testDocument').liveEdit().generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a document with a field', () => {
  const schema = {
    type: 'document',
    name: 'testDocument',
    title: 'Test Document',
    fields: [
      {
        type: 'string',
        name: 'title',
        title: 'Title',
      },
    ],
  };
  const generated = S.doc('testDocument')
    .fields([S.str('title')])
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a document with a preview', () => {
  const schema = {
    type: 'document',
    name: 'testDocument',
    title: 'Test Document',
    preview: {
      select: {
        title: 'title',
        subtitle: 'testSubtitle',
      },
    },
  };
  const generated = S.doc('testDocument')
    .preview(S.preview().select('title').select('subtitle', 'testSubtitle'))
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a document with an ordering', () => {
  const schema = {
    type: 'document',
    name: 'testDocument',
    title: 'Test Document',
    orderings: [
      {
        name: 'publishedDate',
        title: 'Published Date, New',
        by: [
          {
            direction: 'desc',
            field: 'published_on',
          },
        ],
      },
    ],
  };

  const generated = S.doc('testDocument')
    .orderings([
      S.ordering('publishedDate')
        .title('Published Date, New')
        .by('published_on', 'desc'),
    ])
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a string', () => {
  const schema = {
    type: 'string',
    name: 'testString',
    title: 'Test String',
    options: {
      list: ['foo', { title: 'Bar!?', value: 'bar' }],
      layout: 'dropdown',
      direction: 'vertical',
    },
  };
  const generated = S.str('testString')
    .list([
      'foo',
      {
        title: 'Bar!?',
        value: 'bar',
      },
    ])
    .layout('dropdown')
    .direction('vertical')
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a date with format', () => {
  const schema = {
    type: 'date',
    name: 'testDate',
    title: 'Test Date',
    options: {
      calendarTodayLabel: 'Today!',
      dateFormat: 'YYYY-MM-DD',
    },
  };
  const generated = S.date('testDate')
    .format('YYYY-MM-DD')
    .todayLabel('Today!')
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a datetime with options', () => {
  const schema = {
    type: 'datetime',
    name: 'testDatetime',
    title: 'Test Datetime',
    options: {
      calendarTodayLabel: 'Today!',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm',
      timeStep: 15,
    },
  };
  const generated = S.datetime('testDatetime')
    .format({ date: 'YYYY-MM-DD', time: 'HH:mm' })
    .step(15)
    .todayLabel('Today!')
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a reference', () => {
  const schema = {
    type: 'reference',
    name: 'testRef',
    title: 'Test Ref',
    to: [{ type: 'foo' }, { type: 'bar' }, { type: 'baz' }],
    weak: true,
    options: {
      filter: 'qux == $qux',
      filterParams: {
        qux: 'Quux',
      },
    },
  };
  const generated = S.ref('testRef')
    .to([{ type: 'foo' }])
    .add('bar')
    .add({ type: 'baz' })
    .weak()
    .filter('qux == $qux', { qux: 'Quux' })
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a boolean', () => {
  const schema = {
    type: 'boolean',
    name: 'testBoolean',
    title: 'Test Boolean',
    options: {
      layout: 'checkbox',
    },
  };
  const generated = S.bool('testBoolean').layout('checkbox').generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a slug', () => {
  const schema = {
    type: 'slug',
    name: 'testSlug',
    title: 'Test Slug',
    options: {
      maxLength: 30,
      source: 'title',
    },
  };
  const generated = S.slug('testSlug').source('title').maxLength(30).generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a file', () => {
  const schema = {
    type: 'file',
    name: 'testFile',
    title: 'Test File',
    options: {
      accept: 'image/*,.pdf',
      storeOriginalFilename: false,
    },
  };
  const generated = S.file('testFile')
    .accept('image/*,.pdf')
    .storeOriginalFilename(false)
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a geopoint', () => {
  const schema = {
    type: 'geopoint',
    name: 'testGeopoint',
    title: 'Test Geopoint',
  };
  const generated = S.geo('testGeopoint').generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a number', () => {
  const schema = {
    type: 'number',
    name: 'testNumber',
    title: 'Test Number',
    options: {
      list: [1, { title: 'Two', value: 2 }],
    },
  };
  const generated = S.num('testNumber')
    .list([1, { title: 'Two', value: 2 }])
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates a url', () => {
  const schema = {
    type: 'url',
    name: 'testUrl',
    title: 'Test URL',
  };
  const generated = S.url('testUrl', 'Test URL').generate();
  expect(generated).toStrictEqual(schema);
});

test('generates basic text', () => {
  const schema = {
    type: 'text',
    name: 'testText',
    title: 'Test Text',
    rows: 100,
  };
  const generated = S.text('testText').rows(100).generate();
  expect(generated).toStrictEqual(schema);
});

test('generates an array of strings', () => {
  const schema = {
    type: 'array',
    name: 'testArray',
    title: 'Test Array',
    of: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
    ],
  };
  const generated = S.arr('testArray')
    .of([S.str('title'), S.str('description')])
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('throws if predefined array field not found', () => {
  const generatorFn = () =>
    S.array('testArray').of(['thisIsNotDefined']).generate();
  expect(generatorFn).toThrow();
});

test('generates blocktext', () => {
  const styles = [
    { title: 'Normal', value: 'normal' },
    { title: 'Heading 1', value: 'h1' },
  ];
  const lists = [
    { title: 'Bullet', value: 'bullet' },
    { title: 'Numbered', value: 'number' },
  ];
  const decorators = [
    { title: 'Strong', value: 'strong' },
    { title: 'Emphasis', value: 'em' },
  ];
  const schema = {
    type: 'array',
    name: 'testBlockText',
    title: 'Test Block Text',
    of: [
      {
        type: 'block',
        styles,
        lists,
        marks: {
          decorators,
          annotations: [
            {
              title: 'Link',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
                {
                  title: 'Open in New Tab?',
                  name: 'newtab',
                  type: 'boolean',
                },
              ],
            },
          ],
        },
      },
      {
        name: 'testImage',
        title: 'Test Image',
        type: 'image',
      },
    ],
  };
  const generated = S.blocks('testBlockText')
    .of([S.img('testImage')])
    .styles(styles)
    .lists(lists)
    .marks({
      decorators,
      annotations: [
        S.obj('link').fields([
          S.url('href', 'URL'),
          S.bool('newtab', 'Open in New Tab?'),
        ]),
      ],
    })
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates an object', () => {
  const schema = {
    type: 'object',
    name: 'testObject',
    title: 'Test Object',
    options: {
      collapsible: true,
      collapsed: false,
    },
  };
  const generated = S.obj('testObject')
    .collapsible(true)
    .collapsed(false)
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates an object with fieldsets', () => {
  const schema = {
    type: 'object',
    name: 'testObject',
    title: 'Test Object',
    fieldsets: [
      {
        name: 'testFieldset',
        title: 'Test Fieldset',
        options: {
          collapsed: true,
          collapsible: false,
          columns: 3,
        },
      },
    ],
    fields: [
      {
        type: 'string',
        name: 'name',
        title: 'Name',
        fieldset: 'testFieldset',
      },
    ],
  };
  const generated = S.obj('testObject')
    .fieldsets([
      S.fieldset('testFieldset').collapsed(true).collapsible(false).columns(3),
    ])
    .fields([S.str('name').fieldset('testFieldset')])
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('generates an object with a predefined field', () => {
  const predefinedField = {
    type: 'string',
    name: 'title',
    title: 'Title',
  };
  const S = new SchemaBuilder({
    title: predefinedField,
  });
  const schema = {
    type: 'object',
    name: 'testObject',
    title: 'Test Object',
    fields: [predefinedField],
  };
  const generated = S.obj('testObject').field('title').generate();
  expect(generated).toStrictEqual(schema);
});

test('generates an image with a field', () => {
  const schema = {
    type: 'image',
    name: 'testImage',
    title: 'Test Image',
    fields: [
      {
        type: 'string',
        name: 'testAlt',
        title: 'Test Alt',
      },
    ],
    options: {
      metadata: ['exif'],
      hotspot: true,
      storeOriginalFilename: true,
      accept: 'image/*',
    },
  };
  const generated = S.img('testImage')
    .field(S.str('testAlt'))
    .metadata(['exif'])
    .hotspot()
    .storeOriginalFilename()
    .accept('image/*')
    .generate();
  expect(generated).toStrictEqual(schema);
});

test('adds a predefined field after initialisation', () => {
  const predefinedField = {
    type: 'string',
    name: 'title',
    title: 'Title',
  };
  const S = new SchemaBuilder();
  S.define('title', predefinedField);
  const schema = {
    type: 'object',
    name: 'testObject',
    title: 'Test Object',
    fields: [predefinedField],
  };
  const generated = S.obj('testObject').field('title').generate();
  expect(generated).toStrictEqual(schema);
});

test('adds a predefined field created with the schema builder', () => {
  const S = new SchemaBuilder();
  const predefinedField = S.str('title').generate();
  S.define('title', predefinedField);
  const schema = {
    type: 'object',
    name: 'testObject',
    title: 'Test Object',
    fields: [
      {
        type: 'string',
        name: 'title',
        title: 'Title',
      },
    ],
  };
  const generated = S.obj('testObject').field('title').generate();
  expect(generated).toStrictEqual(schema);
});
