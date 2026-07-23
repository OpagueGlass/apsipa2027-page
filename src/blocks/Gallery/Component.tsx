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
    three: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`,
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

            return (
              <Card key={index} className={cn('pt-0', !content && 'pb-0', media && 'mx-auto')}>
                <CardContent className="px-0">
                  {media && (
                    <Media
                      imgClassName={cn('aspect-video h-80 object-cover min-w-56')}
                      resource={media}
                      pictureClassName={cn('m-0')}
                    />
                  )}
                </CardContent>
                {content && (
                  <CardHeader>
                    <RichText data={content} enableGutter={false} className="w-full" />
                  </CardHeader>
                )}
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
