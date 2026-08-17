import type { Block, Field } from 'payload'

import { GalleryBlock } from '@/blocks/Gallery/config'
import { TimelineBlock } from '@/blocks/Timeline/config'
import { titleRichTextField } from '@/fields/inlineRichText'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { SponsorBlock } from '../../blocks/SponsorBlock/config'

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
    titleRichTextField,
    {
      name: "isLineVariant",
      type: "checkbox",
      label: "Use line style",
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
