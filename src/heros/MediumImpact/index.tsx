import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { MediumImpactHeroRichText } from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative -mt-[4rem] min-h-[50vh]">
      {media && typeof media === 'object' && (
        <Media
          fill
          className="absolute inset-0 z-0"
          imgClassName="h-full w-full object-cover"
          priority
          resource={media}
        />
      )}
      <div className="container relative z-10 mb-8 flex min-h-[50vh] items-center justify-start">
        <div className="mt-6">
          {richText && (
            <MediumImpactHeroRichText
              className="mb-6 text-white prose-headings:my-2 prose-headings:font-normal"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} size="lg" className="px-2" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
