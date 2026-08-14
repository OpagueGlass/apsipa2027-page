import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { titleRichTextField, inlineRichTextField } from '@/fields/inlineRichText'

const itemFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
  },
  inlineRichTextField({ name: 'content' }),
  linkGroup({
    overrides: {
      maxRows: 2,
    },
  }),
]

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'Gallery',
  fields: [
    titleRichTextField,
    {
      name: 'columns',
      type: 'select',
      defaultValue: 'three',
      options: [
        {
          label: 'One',
          value: 'one',
        },
        {
          label: 'Two',
          value: 'two',
        },
        {
          label: 'Three',
          value: 'three',
        },
      ],
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.title),
      },
    },
    link({
      overrides: {
        admin: {
          condition: (_data, siblingData) => Boolean(siblingData?.enableLink),
        },
      },
    }),
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: itemFields,
    },
  ],
}
