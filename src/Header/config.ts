import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Réglages',
    description:
      'Entrées du menu principal. Réordonner par glisser-déposer. Chaque entrée pointe vers une page interne ou une URL externe.',
  },
  fields: [
    {
      name: 'navItems',
      label: 'Entrées du menu',
      type: 'array',
      labels: {
        singular: 'Entrée',
        plural: 'Entrées',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
