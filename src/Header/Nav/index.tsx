import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/utilities/utils'
import { ChevronDownIcon, Menu } from 'lucide-react'

type NavigationBlockProps = NonNullable<HeaderType['navigationBlocks']>[number]
type NavigationGroupProps = Extract<NavigationBlockProps, { blockType: 'navigationGroup' }>
type NavigationLinkProps = Extract<NavigationBlockProps, { blockType: 'navigationItem' }>['link']
type NavigationItemProps = Extract<NavigationBlockProps, { blockType: 'navigationItem' }>

const navigationBlockComponents = {
  navigationGroup: NavigationGroupBlock,
  navigationItem: NavigationItemBlock,
}

const sheetBlockComponents = {
  navigationGroup: SheetNavigationGroupBlock,
  navigationItem: SheetNavigationItemBlock,
}

const renderBlock =
  (blockComponents: typeof navigationBlockComponents) =>
  (block: NavigationBlockProps, index: number) => {
    const { blockType } = block

    if (blockType && blockType in blockComponents) {
      const Block = blockComponents[blockType]

      if (Block) {
        return (
          <div key={index}>
            {/* @ts-expect-error there may be some mismatch between the expected types here */}
            <Block {...block} disableInnerContainer />
          </div>
        )
      }
    }
    return null
  }

function NavItem({ link }: { link: NavigationLinkProps }) {
  return (
    <NavigationMenuLink
      className={navigationMenuTriggerStyle()}
      render={
        <CMSLink appearance="inline" {...link} label={null}>
          <div>
            <span className="leading-none font-medium">{link.label}</span>
          </div>
        </CMSLink>
      }
    />
  )
}

function NavigationGroupBlock({ groupName, links }: NavigationGroupProps) {
  return (
    <NavigationMenuItem key={groupName}>
      <NavigationMenuTrigger>{groupName}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-60 p-2">
          {links?.map(({ link }, index) => (
            <li key={index} className="rounded-sm">
              <NavItem key={index} link={link} />
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

function NavigationItemBlock({ link }: NavigationItemProps) {
  return (
    <NavigationMenuItem key={link.label}>
      <NavItem link={link} />
    </NavigationMenuItem>
  )
}

function SheetNavItem({ link, className }: { link: NavigationLinkProps; className?: string }) {
  return <CMSLink appearance="ghost" {...link} className={cn('w-full text-start', className)} />
}

function SheetNavigationGroupBlock({ groupName, links }: NavigationGroupProps) {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        render={
          <Button variant="ghost" className="w-full">
            {groupName}
            <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
          </Button>
        }
      />

      <CollapsibleContent className="pl-4 mt-2 space-y-2">
        {links?.map(({ link }, index) => (
          <SheetNavItem key={index} link={link} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

function SheetNavigationItemBlock({ link }: NavigationItemProps) {
  return <SheetNavItem link={link} />
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const { navigationBlocks } = data

  const hasBlocks =
    navigationBlocks && Array.isArray(navigationBlocks) && navigationBlocks.length > 0

  if (hasBlocks) {
    return (
      <>
        <nav className="hidden items-center gap-1 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationBlocks.map(renderBlock(navigationBlockComponents))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-5 w-5 mr-2" />
            </SheetTrigger>
            <SheetContent className="overflow-y-auto no-scrollbar w-[300px] sm:w-[400px] py-20 px-4">
              {navigationBlocks.map(renderBlock(sheetBlockComponents))}
            </SheetContent>
          </Sheet>
        </div>
      </>
    )
  }

  return null
}
