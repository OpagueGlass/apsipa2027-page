import type { GlobalConfig } from 'payload'

import { linkGroup } from '@/fields/linkGroup'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'information',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'venue',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'footerItems',
      type: 'array',
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
      admin: {
        initCollapsed: true,
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'legalPolicies',
        maxRows: 2,
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
