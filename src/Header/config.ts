import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { linkGroup } from '@/fields/linkGroup'
import type { Block } from 'payload'

const NavGroup: Block = {
  slug: 'navigationGroup',
  fields: [
    {
      name: 'groupName',
      type: 'text',
      required: true,
    },
    linkGroup({
      appearances: false,
    }),
  ],
}

const NavItem: Block = {
  slug: 'navigationItem',
  fields: [
    link({ appearances: false }),
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navigationBlocks',
      type: 'blocks',
      blocks: [NavGroup, NavItem],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
