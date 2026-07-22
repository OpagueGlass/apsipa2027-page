import type { Timeline as TimelineProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export const Timeline: React.FC<TimelineProps> = (props) => {
  const { title, items } = props

  const dateItems = items
    .map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="container">
      {title && <RichText data={title} enableGutter={false} className="mb-8" />}
      <Card>
        <CardContent className="py-4 px-8">
          <div className="relative">
            {/* Continuous vertical line */}
            <span className="absolute top-2 bottom-2 left-[11px] w-px bg-border" />

            {/* Timeline items */}
            <div className="space-y-6">
              {dateItems.map((item, index) => (
                <div key={index} className="relative flex gap-4 pl-0">
                  {/* Status */}
                  <div className="relative z-10 flex size-6 shrink-0 items-center justify-center">
                    {item.date.getTime() + 1000 * 60 * 60 * 24 < new Date().getTime() ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary">
                        <Check className="size-3 text-primary-foreground" />
                      </span>
                    ) : (
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/20">
                        <span className="size-2.5 rounded-full bg-primary" />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <div className="text-sm font-semibold text-primary">
                      {item.date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <RichText data={item.event} enableGutter={false} />
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
