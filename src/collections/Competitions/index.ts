import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { isEditor } from '../../access/isEditor'
import { slugField } from 'payload'

export const Competitions: CollectionConfig = {
  slug: 'competitions',
  labels: {
    singular: 'Compétition',
    plural: 'Compétitions',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: isEditor,
  },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'pays', 'updatedAt'],
    group: 'Taxonomies',
    description: 'Taxonomie utilisée pour filtrer et regrouper les articles par compétition.',
  },
  fields: [
    {
      name: 'nom',
      label: 'Nom',
      type: 'text',
      required: true,
    },
    {
      name: 'pays',
      label: 'Pays / zone',
      type: 'text',
      admin: {
        description: 'Exemple : Angleterre, Europe, Monde.',
      },
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({ useAsSlug: 'nom' }),
  ],
}
