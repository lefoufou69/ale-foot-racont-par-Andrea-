import type { GlobalConfig } from 'payload'

/**
 * Global « Identité » — réglages éditoriaux du magazine.
 * Sont volontairement séparés du SEO (géré par le plugin) pour rester
 * lisibles et modifiables par un non-technicien.
 */
export const Identite: GlobalConfig = {
  slug: 'identite',
  label: 'Identité',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Réglages',
    description: 'Nom du magazine, signature, logo. Visible partout sur le site.',
  },
  fields: [
    {
      name: 'nomSite',
      label: 'Nom du magazine',
      type: 'text',
      defaultValue: 'Le foot raconté par Andrea Planet',
      required: true,
    },
    {
      name: 'tagline',
      label: 'Signature',
      type: 'text',
      defaultValue: 'L\'analyse a le temps.',
      admin: {
        description: 'Apparaît dans le pied de page et sur les pages auteur / état vide.',
      },
    },
    {
      name: 'logoCustom',
      label: 'Logo personnalisé (optionnel)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optionnel. Si vide, le logo typographique par défaut (Andrea Planet) est utilisé.',
      },
    },
    {
      name: 'descriptionCourte',
      label: 'Description courte',
      type: 'textarea',
      defaultValue:
        "Un magazine pour prendre le temps : analyses tactiques, histoire, récits longs. Pas de live, pas de mercato minute par minute.",
      admin: {
        description: 'Utilisée dans le pied de page et pour le SEO par défaut.',
      },
    },
  ],
}
