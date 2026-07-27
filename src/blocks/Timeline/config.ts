import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

const itemFields: Field[] = [
  {
    name: 'date',
    type: 'date',
    required: true,
    admin: {
      date: {
        pickerAppearance: 'dayAndTime',
      },
    },
  },
  {
    name: 'label',
    type: 'text',
  },
  {
    name: 'description',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
      },
    }),
    required: true,
  },
]

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'Timeline',
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
      name: 'displayTime',
      type: 'select',
      label: 'Display Time',
      defaultValue: 'datetime',
      options: [
        {
          label: 'Date & Time',
          value: 'datetime',
        },
        {
          label: 'Date Only',
          value: 'date',
        },
        {
          label: 'Time Only',
          value: 'time',
        },
      ],
      required: true,
    },
    {
      name: '24HourFormat',
      type: 'checkbox',
      admin: {
        condition: (_, siblingData) =>
          siblingData.displayTime === 'time' || siblingData.displayTime === 'datetime',
      },
    },
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
