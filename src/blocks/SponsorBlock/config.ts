import type { Block, Field } from 'payload'

import { titleRichTextField } from '@/fields/inlineRichText'
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
  interfaceName: 'SponsorBlock',
  fields: [
    titleRichTextField,
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
