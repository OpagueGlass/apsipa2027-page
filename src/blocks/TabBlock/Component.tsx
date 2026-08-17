import RichText from '@/components/RichText'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { TabBlock as TabBlockProps } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'
import { hasText } from '@payloadcms/richtext-lexical/shared'

export const TabBlock: React.FC<TabBlockProps> = (props) => {
  const { title, tabs, isLineVariant } = props

  return (
    <div className="my-16">
      {hasText(title) && (
        <div className="container mb-8">
          <RichText data={title} enableGutter={false} />
        </div>
      )}
      <Tabs>
        <div className="container">
          <TabsList variant={isLineVariant ? 'line' : 'default'} className="mb-4">
            {tabs.map(({ label }, index) => (
              <TabsTrigger value={label} key={index}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map(({ label, layout }, index) => (
          <TabsContent value={label} key={index} className="-mt-8">
            <RenderBlocks blocks={layout} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
