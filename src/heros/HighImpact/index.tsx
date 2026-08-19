'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HighImpactHeroRichText } from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, shadeMedia }) => {
  return (
    <div className="relative -mt-[4rem] min-h-[80vh]">
      {media && typeof media === 'object' && (
        <Media
          fill
          className="absolute inset-0 z-0"
          imgClassName="h-full w-full object-cover"
          priority
          resource={media}
        />
      )}
      {shadeMedia && (
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      )}
      <div className="container relative z-10 mb-8 flex min-h-[80vh] items-center justify-start">
        <div className="relative max-w-[36.5rem]">
          {richText && (
            <HighImpactHeroRichText
              className="mb-8 text-white"
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
