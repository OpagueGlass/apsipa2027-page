import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  InlineCodeFeature,
  ParagraphFeature,
  IndentFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  RelationshipFeature,
  BlockquoteFeature,
  UploadFeature,
  HorizontalRuleFeature,
  BlocksFeature,
  EXPERIMENTAL_TableFeature,

} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { Banner } from '../Banner/config'
import { MediaBlock } from '../MediaBlock/config'
import { Code } from '../Code/config'
import { GalleryBlock } from '../Gallery/config'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          InlineCodeFeature(),
          ParagraphFeature(),
          IndentFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          ChecklistFeature(),
          RelationshipFeature(),
          BlockquoteFeature(),
          UploadFeature(),
          HorizontalRuleFeature(),
          BlocksFeature({ blocks: [Banner, Code, MediaBlock, GalleryBlock] }),
          EXPERIMENTAL_TableFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
