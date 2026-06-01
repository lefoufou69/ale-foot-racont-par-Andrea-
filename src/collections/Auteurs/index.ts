import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { isEditor } from '../../access/isEditor'
import { slugField } from 'payload'

export const Auteurs: CollectionConfig = {
  slug: 'auteurs',
  labels: {
    singular: 'Auteur',
    plural: 'Auteurs',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: isEditor,
  },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'updatedAt'],
    group: 'Taxonomies',
    description:
      'Signatures publiques. Une signature peut être liée à un compte utilisateur, mais n\'a pas besoin d\'un compte pour exister.',
  },
  fields: [
    {
      name: 'nom',
      label: 'Nom',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      label: 'Biographie',
      type: 'textarea',
      admin: {
        description: 'Quelques lignes affichées sur la page auteur et en bas des articles.',
      },
    },
    {
      name: 'avatar',
      label: 'Portrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'liens',
      label: 'Liens externes',
      type: 'array',
      labels: {
        singular: 'Lien',
        plural: 'Liens',
      },
      fields: [
        {
          name: 'label',
          label: 'Intitulé',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'YouTube, site personnel, etc.',
        initCollapsed: true,
      },
    },
    {
      name: 'utilisateur',
      label: 'Compte utilisateur lié',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description:
          'Optionnel. Si cette signature correspond à un compte de connexion à l\'administration.',
      },
    },
    slugField({ useAsSlug: 'nom' }),
  ],
}
