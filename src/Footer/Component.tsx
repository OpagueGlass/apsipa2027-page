import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Montserrat } from 'next/font/google'
import { cn } from '@/utilities/utils'

import { Mail, MapPin } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
})

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const info = footerData?.information

  const footerItems = footerData?.footerItems || []

  const legalPolicies = footerData?.legalPolicies || []

  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <div className="container py-8 gap-8">
        <div className="flex grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 mb-8 lg:mb-0">
            <Link className="flex items-center lg:justify-start" href="/">
              <span className={cn('font-bold text-xl', montserrat.className)}>
                APSIPA
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium text-muted-foreground whitespace-pre-line">
              {info?.description}
            </p>
            <div>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="font-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="mt-0.5 inline size-4" />
                    <CMSLink url={`mailto:${info?.email}`} label={null}>
                      <span className="whitespace-pre-line hover:text-foreground/80">{info?.email}</span>
                    </CMSLink>
                  </div>
                </li>
                <li className="font-medium">
                  <div className="flex gap-2">
                    <MapPin className="mt-0.5 inline size-4" />
                    <CMSLink url={`https://www.google.com/maps/search/${info?.venue}`} label={null}>
                      <span className="whitespace-pre-line hover:text-foreground/80">
                        {info?.venue}
                      </span>
                    </CMSLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {footerItems.map(({ link, groupName }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
            
          </nav>
        </div> */}
          {footerItems.map(({ links, groupName }, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-semibold">{groupName}</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                {links?.map(({ link }, linkIdx) => (
                  <li key={linkIdx} className="font-medium hover:text-foreground/80">
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 mt-8 flex flex-col justify-between gap-4 border-t border-border text-xs font-medium text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} APSIPA. All rights reserved.</p>
          <ul className="flex gap-4">
            {legalPolicies?.map(({ link }, linkIdx) => (
              <li key={linkIdx} className="underline hover:text-foreground/80">
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
