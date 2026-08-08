import type { Timeline as TimelineProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export const Timeline: React.FC<TimelineProps> = (props) => {
  const { title, displayTime, items } = props

  const currentDateTime = new Date().getTime()

  const hasOccurred = (date: Date) => {
    if (displayTime === 'date') {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0) // Set to the start of the day
      return date.getTime() < currentDate.getTime()
    }
    return date.getTime() < currentDateTime
  }

  const dateItems = items
    .map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const toDatetimeString = (date: Date) => {
    const dateString = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: !props['24HourFormat'],
    })

    if (displayTime === 'date') {
      return dateString
    } else if (displayTime === 'time') {
      return timeString
    }

    return `${dateString} ${timeString}`
  }

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
              {dateItems.map((item, index) => (
                <div key={index} className="relative flex gap-4 pl-0">
                  {/* Status */}
                  <div className="relative z-10 flex size-6 shrink-0 items-center justify-center">
                    {hasOccurred(item.date) ? (
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
                    <div className="text-sm space-x-2">
                      <span className="font-semibold text-primary">
                        {toDatetimeString(item.date)}
                      </span>
                      <span className="text-muted-foreground">{item.label}</span>
                    </div>
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
