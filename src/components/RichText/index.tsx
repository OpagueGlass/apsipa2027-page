import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { GalleryBlock } from '@/blocks/Gallery/Component'
import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  Gallery as GalleryProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Libre_Baskerville, Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | GalleryProps
    >

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
})

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node, nodesToJSX }) => {
    return (
      <node.tag className={cn(montserrat.className)}>
        {nodesToJSX({ nodes: node.children })}
      </node.tag>
    )
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3 flex flex-col items-center"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto w-full"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    gallery: ({ node }) => <GalleryBlock {...node.fields} enableGutter={false} />,
  },
})

const highImpactHeroJsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...jsxConverters({ defaultConverters }),
  heading: ({ node, nodesToJSX }) => {
    if (node.tag === 'h1') {
      const text = nodesToJSX({ nodes: node.children })
      return <h1 className="font-bold tracking-tight">{text}</h1>
    }
    return (
      defaultConverters?.heading as (args: {
        node: typeof node
        nodesToJSX: typeof nodesToJSX
      }) => ReactNode
    )({ node, nodesToJSX })
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  serif?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function HeroRichTextConverter(converters: JSXConvertersFunction<NodeTypes>) {
  return (props: Props) => {
    const { className, enableProse = true, enableGutter = false, ...rest } = props
    return (
      <ConvertRichText
        converters={converters}
        className={cn(
          montserrat.className,
          {
            container: enableGutter,
            'max-w-none': !enableGutter,
            'mx-auto prose md:prose-md dark:prose-invert': enableProse,
          },
          className,
        )}
        {...rest}
      />
    )
  }
}

export const MediumImpactHeroRichText = HeroRichTextConverter(jsxConverters)
export const HighImpactHeroRichText = HeroRichTextConverter(highImpactHeroJsxConverters)

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, serif = false, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        serif ? libreBaskerville.className : montserrat.className,
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
