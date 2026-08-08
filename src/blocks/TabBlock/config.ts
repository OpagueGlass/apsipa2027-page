import type { Block, Field } from 'payload'

import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { SponsorBlock } from '../../blocks/SponsorBlock/config'
import { GalleryBlock } from '@/blocks/Gallery/config'
import { TimelineBlock } from '@/blocks/Timeline/config'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

const tabItems: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'layout',
    type: 'blocks',
    // Edit Block Types here to add new blocks to the admin page tab block options
    blocks: [
      CallToAction,
      Content,
      MediaBlock,
      FormBlock,
      GalleryBlock,
      TimelineBlock,
      SponsorBlock,
    ],
    required: true,
    admin: {
      initCollapsed: true,
    },
  },
]

export const TabBlock: Block = {
  slug: 'tabBlock',
  interfaceName: 'TabBlock',
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
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: tabItems,
    },
  ],
}
