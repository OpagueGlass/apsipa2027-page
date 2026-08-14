import {
  BlockquoteFeature,
  FixedToolbarFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
  RelationshipFeature,
  TextStateFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'
import { textStateConfig } from '@/fields/textStateConfig'

export const titleRichTextField: Field = {
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
}

export const inlineRichTextField = ({
  name,
  label,
  required,
}: {
  name: string
  label?: string
  required?: boolean
}): Field => ({
  name: name,
  type: 'richText',
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
        InlineCodeFeature(),
        ParagraphFeature(),
        IndentFeature(),
        RelationshipFeature(),
        BlockquoteFeature(),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        TextStateFeature({
          state: textStateConfig,
        }),
      ]
    },
  }),
  label: label ?? false,
  required: required ?? false,
})
