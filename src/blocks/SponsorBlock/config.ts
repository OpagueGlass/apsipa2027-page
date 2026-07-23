import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const itemFields: Field[] = [
  { name: 'name', type: 'text', required: true },
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    appearances: false,
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const SponsorBlock: Block = {
  slug: 'sponsor',
  interfaceName: 'Sponsor Block',
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
      name: 'goldSponsors',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: itemFields,
    },
    {
      name: 'silverSponsors',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: itemFields,
    },
    {
      name: 'bronzeSponsors',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: itemFields,
    },
  ],
}
