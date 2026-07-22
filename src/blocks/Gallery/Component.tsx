import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import React from 'react'

import { CMSLink } from '@/components/Link'
import type { Gallery as GalleryBlockProps } from '@/payload-types'

type Props = GalleryBlockProps & {
  className?: string
  enableGutter?: boolean
}

export const GalleryBlock: React.FC<Props> = (props) => {
  const { title, columns, items, className, enableGutter = true } = props

  const colsClasses = {
    one: 'grid-cols-1',
    two: 'grid-cols-1 md:grid-cols-2',
    three: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div
      className={cn(
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {title && <RichText data={title} enableGutter={false} className="mb-8" />}
      <div className={cn('grid gap-4', colsClasses[columns || 'three'])}>
        {items &&
          items.map((item, index) => {
            const { media, content, links } = item
            if (!content) return null

            return (
              <Card key={index} className="pt-0">
                <CardContent className="px-0">
                  {media && (
                    <Media
                      imgClassName={cn('aspect-video h-70 rounded-t-xl object-cover')}
                      resource={media}
                    />
                  )}
                </CardContent>
                <CardHeader>
                  <RichText data={content} enableGutter={false} sans className="flex w-full" />
                </CardHeader>

                {Array.isArray(links) && links.length > 0 && (
                  <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch">
                    {links.map(({ link }, i) => {
                      return <CMSLink key={i} {...link} />
                    })}
                  </CardFooter>
                )}
              </Card>
            )
          })}
      </div>
    </div>
  )
}
