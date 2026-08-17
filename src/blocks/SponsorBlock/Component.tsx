import { cn } from '@/utilities/ui'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { SponsorBlock as SponsorBlockProps } from '@/payload-types'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import { Crown, Diamond } from 'lucide-react'

type Sponsors = SponsorBlockProps['supportedBy']

type Sponsor = NonNullable<Sponsors>[number]

type Tiers = 'platinum' | 'gold' | 'silver' | 'bronze'

interface SponsorTierConfig {
  label: string
  stripGradient: string
  badge: React.ReactNode
  badgeColor: string
  textColor: string
  logoSize: string
  gridCols: string
  cellPadding: string
  cellMaxHeight: string
}

const tierConfig: Record<Tiers, SponsorTierConfig> = {
  platinum: {
    label: 'Platinum',
    stripGradient: 'from-slate-100 via-slate-200 to-slate-300',
    badgeColor: 'text-slate-400',
    textColor: 'text-slate-500',
    badge: <Crown className="h-3 w-3 fill-current" aria-hidden="true" />,
    logoSize: 'h-32',
    gridCols: 'grid-cols-1',
    cellPadding: 'p-[48px] lg:p-[64px]',
    cellMaxHeight: 'h-[240px]',
  },
  gold: {
    label: 'Gold',
    stripGradient: 'from-amber-300 via-amber-400 to-yellow-500',
    badgeColor: 'text-amber-500',
    textColor: 'text-amber-600',
    badge: (
      <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
        <path d="M6 0.5 L7.5 4.2 L11.5 4.6 L8.5 7.2 L9.4 11.2 L6 9.2 L2.6 11.2 L3.5 7.2 L0.5 4.6 L4.5 4.2 Z" />
      </svg>
    ),
    logoSize: 'h-24',
    gridCols: 'grid-cols-1 lg:grid-cols-2',
    cellPadding: 'p-[48px]',
    cellMaxHeight: 'h-[200px]',
  },
  silver: {
    label: 'Silver',
    stripGradient: 'from-slate-300 via-zinc-400 to-slate-500',
    badgeColor: 'text-slate-500',
    textColor: 'text-slate-600',
    badge: (
      <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
        <path d="M6 0 L7.2 4.8 L12 6 L7.2 7.2 L6 12 L4.8 7.2 L0 6 L4.8 4.8 Z" />
      </svg>
    ),
    logoSize: 'h-16',
    gridCols: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    cellPadding: 'p-[24px]',
    cellMaxHeight: 'h-[180px]',
  },
  bronze: {
    label: 'Bronze',
    stripGradient: 'from-amber-700 via-amber-800 to-amber-950',
    badgeColor: 'text-amber-800',
    textColor: 'text-amber-800',
    badge: <Diamond className="h-3 w-3 fill-current" aria-hidden="true" />,
    logoSize: 'h-12',
    gridCols: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
    cellPadding: 'p-[16px]',
    cellMaxHeight: 'h-[140px]',
  },
}

function SponsorCell({
  sponsor,
  padding,
  maxHeight,
}: {
  sponsor: Sponsor
  padding: string
  maxHeight: string
}) {
  const wrapOutline = (child: React.ReactNode) => {
    return (
      <div
        className={cn(
          'flex items-center justify-center border-r border-b border-border',
          maxHeight,
          padding,
        )}
      >
        {child}
      </div>
    )
  }

  const content = (
    <div className="flex relative w-full h-full">
      {sponsor.logo ? (
        <Media fill imgClassName="object-contain" resource={sponsor.logo} alt={sponsor.name} />
      ) : (
        <div className="w-full max-w-[200px] h-12 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
          {sponsor.name}
        </div>
      )}
    </div>
  )

  const linkContent =
    sponsor.enableLink && sponsor.link ? (
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
  tier: Tiers
  sponsors: Sponsors
  className?: string
}) {
  const config = tierConfig[tier]

  if (!sponsors || sponsors.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm rounded-r-2xl bg-background shadow-sm border border-border',
        className,
      )}
    >
      {/* Colored accent strip on the left */}
      <div className={cn('absolute inset-y-0 left-0 w-2 bg-gradient-to-b', config.stripGradient)} />

      {/* Offset content area */}
      <div className="ml-1.5 bg-background">
        {/* Tier header */}
        <div className="px-4 pt-3 pb-2 border-b flex items-center gap-2">
          <span className={config.badgeColor}>{config.badge}</span>
          <span
            className={cn(
              'text-[10px] uppercase tracking-[0.18em] font-semibold',
              config.textColor,
            )}
          >
            {config.label}
          </span>
        </div>

        {/* Sponsor grid */}
        <div className="items-stretch justify-center -mr-px -mb-px">
          <div className={cn('grid', config.gridCols, 'divide-x divide-y ')}>
            {sponsors.map((sponsor, index) => (
              <SponsorCell
                key={index}
                sponsor={sponsor}
                padding={config.cellPadding}
                maxHeight={config.cellMaxHeight}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SupportedByCard({ supporters }: { supporters: Sponsors }) {
  if (!supporters || supporters.length === 0) {
    return null
  }

  return (
    <div className="relative overflow-hidden rounded-sm rounded-r-2xl bg-background shadow-sm border border-border">
      <div className="bg-background">
        {/* Header */}
        <div className="px-4 pt-3 pb-2 border-b flex items-center justify-center gap-2">
          <span className="text-sm uppercase tracking-[0.1em] font-semibold">Supported By</span>
        </div>

        {/* Supporter grid */}
        <div className="items-stretch justify-center -mr-px -mb-px">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y">
            {supporters.map((supporter, index) => (
              <SponsorCell
                key={index}
                sponsor={supporter}
                padding={'p-[24px]'}
                maxHeight={'h-[240px]'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const SponsorBlock: React.FC<SponsorBlockProps> = (props) => {
  const { title, platinumSponsors, goldSponsors, silverSponsors, bronzeSponsors, supportedBy } =
    props

  return (
    <div className="container">
      {hasText(title) && <RichText data={title} enableGutter={false} className="mb-8" />}
      <div className="space-y-6 mb-12">
        <SponsorTier tier="platinum" sponsors={platinumSponsors} />
        <SponsorTier tier="gold" sponsors={goldSponsors} />
        <SponsorTier tier="silver" sponsors={silverSponsors} />
        <SponsorTier tier="bronze" sponsors={bronzeSponsors} />
      </div>
      <SupportedByCard supporters={supportedBy} />
    </div>
  )
}
