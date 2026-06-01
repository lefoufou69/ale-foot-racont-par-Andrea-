import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { isEditor } from '../access/isEditor'
import { slugField } from 'payload'

/**
 * Collection « Rubriques » — gardée sous le slug `categories` pour la
 * compatibilité interne (plugin de recherche, blocs Archive du template),
 * mais entièrement présentée en français dans l'administration.
 *
 * Champs métier supplémentaires : description, ordre d'affichage,
 * couleur d'accent.
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Rubrique',
    plural: 'Rubriques',
  },
  access: {
    create: authenticated,
    delete: isEditor,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'ordre', 'updatedAt'],
    group: 'Taxonomies',
    description:
      'Les rubriques structurent le site (Analyses, Histoire, Dossiers tactiques, Revues…). L\'ordre d\'affichage détermine leur position dans la navigation et les listes.',
  },
  defaultSort: 'ordre',
  fields: [
    {
      name: 'title',
      label: 'Nom',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description courte',
      type: 'textarea',
    },
    {
      name: 'ordre',
      label: 'Ordre d\'affichage',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Plus le nombre est petit, plus la rubrique apparaît tôt.',
        step: 1,
      },
    },
    {
      name: 'couleurAccent',
      label: 'Couleur d\'accent',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Optionnel. Code hexadécimal (ex : #1C4B2E).',
        placeholder: '#1C4B2E',
      },
    },
    slugField({ useAsSlug: 'title' }),
  ],
}
