import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import { SponsorBlock } from '@/blocks/SponsorBlock/Component'
import { Timeline } from './Timeline/Component'
import { TabBlock } from './TabBlock/Component'
import { AccordionBlock } from './Accordion/Component'
import { SpeakersCarouselBlock } from './Speakers/Component'

// Edit Block Components here to add new blocks to the page builder
const blockComponents = {
  // archive: ArchiveBlock,
  accordion: AccordionBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  sponsor: SponsorBlock,
  mediaBlock: MediaBlock,
  gallery: GalleryBlock,
  timeline: Timeline,
  tabBlock: TabBlock,
  speakersBlock: SpeakersCarouselBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
