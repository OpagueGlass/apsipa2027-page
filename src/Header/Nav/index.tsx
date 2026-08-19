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

const sheetBlockComponents = (setSheetOpen: (open: boolean) => void) => {
  return {
    navigationGroup: SheetNavigationGroupBlock({ setSheetOpen }),
    navigationItem: SheetNavigationItemBlock({ setSheetOpen }),
  }
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

function SheetNavItem({
  link,
  setSheetOpen,
  className,
}: {
  link: NavigationLinkProps
  setSheetOpen: (open: boolean) => void
  className?: string
}) {
  return (
    <CMSLink
      appearance="ghost"
      {...link}
      className={cn('w-full text-start py-1.5', className)}
      onClick={() => setSheetOpen(false)}
    />
  )
}

function SheetNavigationGroupBlock({ setSheetOpen }: { setSheetOpen: (open: boolean) => void }) {
  return ({ groupName, links }: NavigationGroupProps) => {
    const [open, setOpen] = useState(false)

    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              className="w-full data-panel-open:bg-muted/50 data-panel-open:hover:bg-muted data-panel-open:focus:bg-muted"
            >
              {groupName}
              <ChevronDownIcon className="ml-auto size-3 transition duration-300 group-data-panel-open/button:rotate-180" />
            </Button>
          }
        />
        <CollapsibleContent className="mt-1 space-y-1">
          {links?.map(({ link }, index) => (
            <SheetNavItem key={index} link={link} setSheetOpen={setSheetOpen} className="px-2.5" />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }
}

function SheetNavigationItemBlock({ setSheetOpen }: { setSheetOpen: (open: boolean) => void }) {
  return ({ link }: NavigationItemProps) => {
    return <SheetNavItem link={link} setSheetOpen={setSheetOpen} />
  }
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const { navigationBlocks } = data

  const [sheetOpen, setSheetOpen] = useState(false)

  const hasBlocks =
    navigationBlocks && Array.isArray(navigationBlocks) && navigationBlocks.length > 0

  if (hasBlocks) {
    return (
      <>
        <nav className="hidden items-center lg:flex ">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navigationBlocks.map(renderBlock(navigationBlockComponents))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <div className="lg:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger onClick={() => setSheetOpen(true)}>
              <Menu className="h-5 w-5 mr-2" />
            </SheetTrigger>
            <SheetContent className="overflow-y-auto no-scrollbar w-[300px] sm:w-[400px] pt-20 px-4 gap-2">
              {navigationBlocks.map(renderBlock(sheetBlockComponents(setSheetOpen)))}
            </SheetContent>
          </Sheet>
        </div>
      </>
    )
  }

  return null
}
