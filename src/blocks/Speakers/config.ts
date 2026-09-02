import type { Block, Field } from 'payload'

import { titleRichTextField } from '@/fields/inlineRichText'
import { link } from '@/fields/link'

const itemFields: Field[] = [
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'title',
    type: 'text',
    required: true,
  },
]

export const Speaker: Block = {
  slug: 'speakersBlock',
  interfaceName: 'speakersCarousel',
  fields: [
    titleRichTextField,
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
