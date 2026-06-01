import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  /** Variante de taille : `compact` pour le header, `full` pour la home/footer. */
  size?: 'compact' | 'full'
  /** Variante de couleur pour fond papier (`ink`) ou fond vert foncé (`paper`). */
  tone?: 'ink' | 'paper'
  /** Accepté pour compat avec l'ancien composant — sans effet ici (rendu textuel). */
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

/**
 * Logo « Le foot raconté par / Andrea Planet ».
 * - Surtitre Archivo majuscules espacé.
 * - Titre Fraunces, « Planet » en vert (ou en green-soft sur fond sombre).
 */
export const Logo: React.FC<Props> = ({ className, size = 'compact', tone = 'ink' }) => {
  const isCompact = size === 'compact'
  const titleColor = tone === 'paper' ? 'text-paper' : 'text-ink'
  const kickerColor = tone === 'paper' ? 'text-paper/70' : 'text-ink-soft'
  const accentColor = tone === 'paper' ? 'text-green-soft' : 'text-green'

  return (
    <span
      aria-label="Le foot raconté par Andrea Planet — accueil"
      className={clsx('inline-flex flex-col leading-none select-none', className)}
    >
      <span
        className={clsx(
          'font-[var(--font-ui)] uppercase tracking-[0.18em] font-semibold',
          kickerColor,
          isCompact ? 'text-[0.55rem] sm:text-[0.65rem]' : 'text-xs sm:text-sm',
        )}
      >
        Le foot raconté par
      </span>
      <span
        className={clsx(
          'font-display tracking-tight',
          titleColor,
          isCompact ? 'text-2xl sm:text-3xl mt-0.5' : 'text-5xl sm:text-6xl mt-1',
        )}
      >
        Andrea&nbsp;<span className={clsx('italic', accentColor)}>Planet</span>
      </span>
    </span>
  )
}
