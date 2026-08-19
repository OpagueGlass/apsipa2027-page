import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export const AccordionBlock: React.FC<AccordionBlockProps> = ({
  title,
  items,
  allowMultipleOpen,
}) => {
  return (
    <div className="container">
      {hasText(title) && <RichText data={title} enableGutter={false} className="mb-8" />}
      <Accordion multiple={allowMultipleOpen ?? false} className="rounded-lg border">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-b px-4 last:border-b-0 py-2"
          >
            <AccordionTrigger className="text-lg">{item.question}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.answer} enableGutter={false} className="ml-0.5" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
