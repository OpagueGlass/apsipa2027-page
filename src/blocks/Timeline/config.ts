import { inlineRichTextField, titleRichTextField } from '@/fields/inlineRichText'
import type { Block, Field } from 'payload'

const itemFields: Field[] = [
  inlineRichTextField({ name: 'eventDate', required: true, label: 'Date' }),
  inlineRichTextField({ name: 'description', required: true, label: 'Description' }),
]

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'Timeline',
  fields: [
    titleRichTextField,
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: itemFields,
      required: true,
    },
  ],
}
