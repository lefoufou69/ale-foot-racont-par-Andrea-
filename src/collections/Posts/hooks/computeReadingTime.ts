import type { CollectionBeforeChangeHook } from 'payload'

/** Mots par minute pour la lecture éditoriale française (lecture posée). */
const WPM = 220

/** Extrait récursivement le texte brut d'un arbre Lexical. */
function extractText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: string; children?: unknown[] }
  if (typeof n.text === 'string') return n.text + ' '
  if (Array.isArray(n.children)) {
    return n.children.map(extractText).join('')
  }
  return ''
}

/**
 * Calcule automatiquement le temps de lecture en minutes à partir du
 * contenu Lexical. Stocké en minutes (arrondi au plus proche, minimum 1).
 */
export const computeReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  const content = (data as { content?: unknown }).content
  if (!content) return data

  const root = (content as { root?: unknown }).root
  const text = extractText(root).trim()
  const words = text.length === 0 ? 0 : text.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / WPM))

  return { ...data, tempsLecture: minutes }
}
