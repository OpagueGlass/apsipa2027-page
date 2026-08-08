import { cn } from '@/utilities/ui'
import Link from 'next/link'

import type { SponsorBlock as SponsorBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { hasText } from '@payloadcms/richtext-lexical/shared'

type Sponsors =
  | SponsorBlockProps['goldSponsors']
  | SponsorBlockProps['silverSponsors']
  | SponsorBlockProps['bronzeSponsors']

type Sponsor = NonNullable<Sponsors>[number]

const tierConfig = {
  gold: {
    label: 'Gold',
    gradient: 'from-amber-300 via-amber-400 to-yellow-500',
    accent: 'text-amber-500',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-600',
    icon: (
      <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
        <path d="M6 0.5 L7.5 4.2 L11.5 4.6 L8.5 7.2 L9.4 11.2 L6 9.2 L2.6 11.2 L3.5 7.2 L0.5 4.6 L4.5 4.2 Z" />
      </svg>
    ),
    logoSize: 'h-24',
    gridCols: 'grid-cols-1 lg:grid-cols-2',
    cellPadding: 'p-[48px]',
    cellMaxHeight: 'h-[220px]',
    maxImageWidth: 'max-w-full',
  },
  silver: {
    label: 'Silver',
    gradient: 'from-slate-200 via-zinc-300 to-slate-400',
    accent: 'text-slate-400',
    badgeBg: 'bg-slate-50',
    badgeText: 'text-slate-500',
    icon: (
      <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
        <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" />
      </svg>
    ),
    logoSize: 'h-16',
    gridCols: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4',
    cellPadding: 'p-[24px]',
    cellMaxHeight: 'h-[180px]',
    maxImageWidth: 'max-w-full',
  },
  bronze: {
    label: 'Bronze',
    gradient: 'from-amber-700 via-amber-800 to-amber-950',
    accent: 'text-amber-800',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    icon: (
      <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
        <path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z" />
      </svg>
    ),
    logoSize: 'h-12',
    gridCols: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
    cellPadding: 'p-[16px]',
    cellMaxHeight: 'h-[140px]',
    maxImageWidth: 'max-w-full',
  },
}

function SponsorCell({
  sponsor,
  padding,
  maxHeight,
  maxImageWidth,
}: {
  sponsor: Sponsor
  padding: string
  maxHeight: string
  maxImageWidth: string
}) {
  const wrapOutline = (child: React.ReactNode) => {
    return (
      <div className="flex items-center justify-center border-r border-b border-border">
        {child}
      </div>
    )
  }

  const content = (
    <div className={cn('w-full flex items-center justify-center', padding, maxHeight)}>
      <div className={cn('w-full flex items-center justify-center')}>
        {sponsor.logo ? (
          <Media
            resource={sponsor.logo}
            alt={sponsor.name}
            className={cn('object-contain', maxImageWidth)}
            // className="w-full object-contain h-80 grayscale hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full max-w-[200px] h-12 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
            {sponsor.name}
          </div>
        )}
      </div>
    </div>
  )

  const linkContent = sponsor.enableLink && sponsor.link ? (
    <CMSLink {...sponsor.link} label={null}>
      {content}
    </CMSLink>
  ) : (
    content
  )

  return wrapOutline(linkContent)
}

function SponsorTier({
  tier,
  sponsors,
  className,
}: {
  tier: keyof typeof tierConfig
  sponsors: Sponsors
  className?: string
}) {
  const config = tierConfig[tier]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm rounded-r-2xl bg-background shadow-sm border border-border',
        className,
      )}
    >
      {/* Colored accent strip on the left */}
      <div className={cn('absolute inset-y-0 left-0 w-2 bg-gradient-to-b', config.gradient)} />

      {/* Offset content area */}
      <div className="ml-1.5 bg-background">
        {/* Tier header */}
        <div className="px-4 pt-3 pb-2 border-b flex items-center gap-2">
          <span className={config.accent}>{config.icon}</span>
          <span
            className={cn(
              'text-[10px] uppercase tracking-[0.18em] font-semibold',
              config.badgeText,
            )}
          >
            {config.label}
          </span>
        </div>

        {/* Sponsor grid */}
        <div className="items-stretch justify-center -mr-px -mb-px">
          <div className={cn('grid', config.gridCols, 'divide-x divide-y ')}>
            {sponsors &&
              sponsors.map((sponsor, index) => (
                <SponsorCell
                  key={index}
                  sponsor={sponsor}
                  padding={config.cellPadding}
                  maxHeight={config.cellMaxHeight}
                  maxImageWidth={config.maxImageWidth}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const SponsorBlock: React.FC<SponsorBlockProps> = (props) => {
  const { goldSponsors, silverSponsors, bronzeSponsors, title } = props

  return (
    <div className="container">
      {hasText(title) && <RichText data={title} enableGutter={false} className="mb-8" />}
      <div className="space-y-6">
        <SponsorTier tier="gold" sponsors={goldSponsors} />
        <SponsorTier tier="silver" sponsors={silverSponsors} />
        <SponsorTier tier="bronze" sponsors={bronzeSponsors} />
      </div>
    </div>
  )
}
