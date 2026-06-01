import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { isEditor } from '../../access/isEditor'
import { slugField } from 'payload'

export const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  labels: {
    singular: 'Podcast',
    plural: 'Podcasts',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: isEditor,
  },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'numeroEpisode', 'publishedAt'],
    group: 'Publications',
    description: 'Épisodes du podcast — fichier audio + show notes éditoriales.',
  },
  fields: [
    {
      name: 'titre',
      label: 'Titre de l\'épisode',
      type: 'text',
      required: true,
    },
    {
      name: 'numeroEpisode',
      label: 'Numéro d\'épisode',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
        step: 1,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Audio',
          fields: [
            {
              name: 'fichierAudio',
              label: 'Fichier audio (upload)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Préférer un MP3 < 100 Mo. Sinon, utiliser l\'URL d\'embed.',
              },
            },
            {
              name: 'embedUrl',
              label: 'URL d\'embed (alternative)',
              type: 'text',
              admin: {
                description: 'Exemple : URL Ausha, Acast, Spotify pour Podcasters.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'duree',
                  label: 'Durée (mm:ss)',
                  type: 'text',
                  admin: { width: '40%', placeholder: '42:18' },
                },
                {
                  name: 'image',
                  label: 'Visuel',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '60%' },
                },
              ],
            },
          ],
        },
        {
          label: 'Show notes',
          fields: [
            {
              name: 'showNotes',
              label: 'Notes de l\'épisode',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              admin: {
                description: 'Plan de l\'épisode, intervenants, liens, références.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Date de publication',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
    },
    slugField({ useAsSlug: 'titre' }),
  ],
  versions: {
    drafts: {
      autosave: { interval: 200 },
      schedulePublish: true,
    },
    maxPerDoc: 30,
  },
}

