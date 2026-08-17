import type { Block } from 'payload'
import { titleRichTextField, inlineRichTextField } from '@/fields/inlineRichText'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    titleRichTextField,
    {
      name: 'allowMultipleOpen',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show multiple answers at the same time',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        inlineRichTextField({ name: 'answer', label: 'Answer', required: true }),
      ],
      required: true,
    },
  ],
}
