import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'

const itemFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'content',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
  },
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
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
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
