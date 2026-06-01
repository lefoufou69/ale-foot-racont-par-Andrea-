import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Pied de page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Réglages',
    description: 'Liens et lien YouTube affichés dans le pied de page.',
  },
  fields: [
    {
      name: 'navItems',
      label: 'Liens du pied de page',
      type: 'array',
      labels: {
        singular: 'Lien',
        plural: 'Liens',
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'youtubeUrl',
      label: 'URL de la chaîne YouTube',
      type: 'text',
      defaultValue: 'https://www.youtube.com/@dédéap69',
      admin: {
        description:
          'Affiché en accent dans le pied de page. Seul réseau social en ligne pour l\'instant.',
        placeholder: 'https://www.youtube.com/@...',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
