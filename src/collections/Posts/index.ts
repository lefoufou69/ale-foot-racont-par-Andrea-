import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isEditor } from '../../access/isEditor'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { computeReadingTime } from './hooks/computeReadingTime'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

/**
 * Collection « Articles » — slug technique `posts` (compatibilité avec le
 * template, le plugin de recherche et le bloc Archive), libellée et étoffée
 * pour notre magazine : surtitre, chapô, légende/crédit image, format,
 * compétition, signatures, temps de lecture calculé, workflow éditorial.
 */
export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: isEditor,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'etatEditorial', 'updatedAt'],
    group: 'Publications',
    description: 'Analyses, récits, dossiers tactiques, revues. Le cœur du magazine.',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contenu',
          fields: [
            {
              name: 'surtitre',
              label: 'Surtitre',
              type: 'text',
              admin: {
                description: 'Petit texte au-dessus du titre. Optionnel.',
              },
            },
            {
              name: 'chapo',
              label: 'Chapô',
              type: 'textarea',
              admin: {
                description: 'Le résumé qui donne envie de lire. 1 à 3 phrases.',
              },
            },
            {
              type: 'collapsible',
              label: 'Image de une',
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'heroImage',
                  label: 'Image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'legendeImage',
                      label: 'Légende',
                      type: 'text',
                      admin: { width: '70%' },
                    },
                    {
                      name: 'creditImage',
                      label: 'Crédit',
                      type: 'text',
                      admin: { width: '30%' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'content',
              label: 'Corps de l\'article',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              required: true,
              admin: {
                description:
                  'Texte riche + blocs (image, encadré, citation, schéma tactique…). Tous les blocs spécifiques au magazine seront ajoutés en Phase 4.',
              },
            },
          ],
        },
        {
          label: 'Méta',
          fields: [
            {
              name: 'format',
              label: 'Format',
              type: 'select',
              defaultValue: 'analyse',
              options: [
                { label: 'Analyse', value: 'analyse' },
                { label: 'Récit', value: 'recit' },
                { label: 'Revue', value: 'revue' },
                { label: 'Dossier', value: 'dossier' },
              ],
              admin: {
                description:
                  'Permet de varier le rendu et d\'afficher une étiquette explicite dans l\'article.',
              },
            },
            {
              name: 'categories',
              label: 'Rubrique(s)',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'competition',
              label: 'Compétition',
              type: 'relationship',
              relationTo: 'competitions',
              admin: {
                description: 'Optionnel.',
              },
            },
            {
              name: 'signatures',
              label: 'Signature(s) (Auteurs)',
              type: 'relationship',
              relationTo: 'auteurs',
              hasMany: true,
              admin: {
                description:
                  'Signatures publiques affichées sur l\'article. Différentes du compte « Rédacteur » qui contrôle les droits d\'édition.',
              },
            },
            {
              name: 'relatedPosts',
              label: 'Articles liés',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              filterOptions: ({ id }) => ({
                id: { not_in: [id] },
              }),
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    // -------- SIDEBAR --------
    {
      name: 'etatEditorial',
      label: 'État éditorial',
      type: 'select',
      defaultValue: 'redaction',
      required: true,
      options: [
        { label: 'En rédaction', value: 'redaction' },
        { label: 'En relecture', value: 'relecture' },
        { label: 'Prêt à publier', value: 'pret' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Cycle interne : rédaction → relecture → prêt à publier. Seul un éditeur peut basculer le statut Payload sur « publié ».',
      },
    },
    {
      name: 'publishedAt',
      label: 'Date de publication',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'tempsLecture',
      label: 'Temps de lecture (min)',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Calculé automatiquement à partir du corps de l\'article.',
      },
    },
    {
      name: 'authors',
      label: 'Rédacteur(s)',
      type: 'relationship',
      hasMany: true,
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description:
          'Comptes Utilisateurs qui ont rédigé l\'article. Différent des « Signatures » publiques.',
      },
    },
    // Champ technique alimenté par le hook populateAuthors pour exposer
    // les noms d'auteurs sans casser la confidentialité de la collection
    // Users. Conservé pour la compatibilité avec le front actuel.
    {
      name: 'populatedAuthors',
      type: 'array',
      access: { update: () => false },
      admin: { disabled: true, readOnly: true },
      fields: [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [computeReadingTime],
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
