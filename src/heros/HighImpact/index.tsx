'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HighImpactHeroRichText } from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative flex -mt-[4rem]">
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
      <div className="container mb-8 relative flex justify-start items-center">
        <div className="max-w-[36.5rem]">
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
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
