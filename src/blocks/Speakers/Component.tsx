import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { SpeakersCarousel as SpeakersCarouselProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import { ArrowRight } from 'lucide-react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

type Props = SpeakersCarouselProps & {
  className?: string
  enableGutter?: boolean
}

export const SpeakersCarouselBlock: React.FC<Props> = ({
  title,
  enableLink,
  link,
  items,
  className,
  enableGutter = true,
}) => {
  return (
    <div
      className={cn(
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {hasText(title) && (
        <div className="mb-8 justify-between flex items-center">
          <RichText data={title} enableGutter={false} className="w-full" />
          {enableLink && link && (
            <CMSLink {...link} className="flex items-center px-2" size="lg">
              <ArrowRight className="ml-2 h-4 w-4" />
            </CMSLink>
          )}
        </div>
      )}
      <Carousel
        opts={{ align: 'start', loop: false }}
        className={cn('mx-0 w-full px-1', montserrat.className)}
      >
        <CarouselContent className="ml-6">
          {items &&
            items.map(({ media, name, title: speakerTitle }, index) => (
              <CarouselItem
                className="basis-[80%] pl-6 sm:basis-[42%] lg:basis-[30%]"
                key={`${name}-${index}`}
              >
                <div className="flex flex-col gap-5">
                  <Media
                    resource={media}
                    imgClassName="h-full w-full object-cover aspect-[3/4] rounded-3xl border border-border bg-muted"
                    className="relative"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold leading-tight">{name}</h3>
                    <p className="text-muted-foreground">{speakerTitle}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
          aria-label="Previous speakers"
          className="-left-4 size-10 border-0 bg-background shadow-md hover:bg-background"
        />
        <CarouselNext
          aria-label="Next speakers"
          className="-right-4 size-10 border-0 bg-background shadow-md hover:bg-background"
        />
      </Carousel>
    </div>
  )
}
