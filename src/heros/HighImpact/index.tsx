'use client'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { HighImpactHeroRichText } from '@/components/RichText'
import type { Page } from '@/payload-types'
import React, { useEffect, useState } from 'react'

export const HighImpactHero: React.FC<Page['hero']> = ({
  richText,
  links,
  media,
  useCameraRoll,
  cameraRollMedia,
  cameraRollDuration,
  shadeMedia,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Set up the loop interval for the camera roll
  useEffect(() => {
    if (!useCameraRoll || !cameraRollMedia || cameraRollMedia.length <= 1) return

    const interval = setInterval(
      () => {
        setCurrentImageIndex((prev) => (prev + 1) % cameraRollMedia.length)
      },
      (cameraRollDuration || 5) * 1000,
    )

    return () => clearInterval(interval)
  }, [useCameraRoll, cameraRollMedia])

  return (
    <div className="relative -mt-[4rem] min-h-[80vh]">
      {media && typeof media === 'object' && !useCameraRoll && (
        <Media
          fill
          className="absolute inset-0 z-0"
          imgClassName="h-full w-full object-cover"
          priority
          resource={media}
        />
      )}
      {useCameraRoll && cameraRollMedia && cameraRollMedia.length > 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {cameraRollMedia.map((img, index) => {
            const isActive = index === currentImageIndex

            return (
              <Media
                key={typeof img === 'object' ? img.id : img}
                fill
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                imgClassName="h-full w-full object-cover"
                priority={index === 0} // Only prioritize the first image for LCP
                resource={img}
              />
            )
          })}
        </div>
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
