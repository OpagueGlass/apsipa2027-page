import { linkGroup } from '@/fields/linkGroup'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'useCameraRoll',
      type: 'checkbox',
      label: 'Use Camera Roll (Loop Images)',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type, useCameraRoll } = {}) =>
          ['highImpact', 'mediumImpact'].includes(type) && !useCameraRoll,
      },
      relationTo: 'media',
    },
    {
      name: 'cameraRollMedia',
      type: 'upload',
      hasMany: true,
      label: 'Camera Roll Images',
      admin: { condition: (_, { useCameraRoll } = {}) => useCameraRoll },
      relationTo: 'media',
    },
    {
      name: 'cameraRollDuration',
      type: 'number',
      defaultValue: 5,
      admin: {
        condition: (_, { useCameraRoll } = {}) => useCameraRoll,
        description: 'Duration to show each image in seconds',
      },
    },
    {
      name: 'shadeMedia',
      type: 'checkbox',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
    },
  ],
  label: false,
}
