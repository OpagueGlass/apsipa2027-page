import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import type { Timeline as TimelineProps } from '@/payload-types'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export const Timeline: React.FC<TimelineProps> = (props) => {
  const { title, items } = props

  return (
    <div className="container">
      {hasText(title) && <RichText data={title} enableGutter={false} className="mb-8" />}
      <Card>
        <CardContent className="py-4 px-8">
          <div className="relative">
            {/* Continuous vertical line */}
            <span className="absolute top-2 bottom-2 left-[11px] w-px bg-border" />

            {/* Timeline items */}
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="relative flex gap-4 pl-0">
                  {/* Status */}
                  <div className="relative z-10 flex size-6 shrink-0 items-center justify-center">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/20">
                      <span className="size-2.5 rounded-full bg-primary" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <RichText
                      data={item.eventTime}
                      enableGutter={false}
                      className="prose-sm font-semibold"
                    />
                    <RichText data={item.description} enableGutter={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
