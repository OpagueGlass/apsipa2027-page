'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { Montserrat } from 'next/font/google'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

const montserrat = Montserrat({
  subsets: ['latin'],
})

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="min-h-[76px] w-full container flex justify-between items-center">
        <Link href="/">
          <span className={cn('font-bold text-xl text-primary', montserrat.className)}>APSIPA</span>
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
