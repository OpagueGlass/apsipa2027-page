'use client'

import { useRowLabel } from '@payloadcms/ui'

type LinkType = {
  link?: {
    label: string
  }
}

export const RowLabel = () => {
  const { data } = useRowLabel<LinkType>()

  return <div>{data.link?.label}</div>
}
