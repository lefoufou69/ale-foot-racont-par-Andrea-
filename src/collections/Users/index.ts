import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isEditor'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  access: {
    admin: authenticated,
    create: isAdmin,
    delete: isAdmin,
    read: authenticated,
    update: ({ req: { user }, id }) => {
      if (!user) return false
      const role = (user as { role?: string }).role
      if (role === 'admin') return true
      // Un utilisateur non-admin ne peut éditer que son propre profil.
      return String(user.id) === String(id)
    },
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    group: 'Compte',
    description:
      'Comptes de connexion à l\'administration. Les signatures publiques (bio, avatar, page auteur) sont gérées dans la collection « Auteurs ».',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Nom complet',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Rôle',
      type: 'select',
      required: true,
      defaultValue: 'auteur',
      access: {
        // Seul un admin peut changer un rôle.
        update: ({ req: { user } }) => (user as { role?: string })?.role === 'admin',
      },
      options: [
        { label: 'Administrateur', value: 'admin' },
        { label: 'Éditeur', value: 'editeur' },
        { label: 'Auteur', value: 'auteur' },
      ],
      admin: {
        description:
          'Administrateur : tout. Éditeur : relit et publie. Auteur : crée et soumet, ne publie pas.',
      },
    },
  ],
  timestamps: true,
}
