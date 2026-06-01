import React from 'react'

import { Logo } from '@/components/Logo/Logo'

const YOUTUBE_URL = 'https://www.youtube.com/@dédéap69'

/**
 * État vide assumé de la page d'accueil — affiché tant qu'aucune
 * page `home` n'est composée dans l'admin Payload.
 *
 * Pas un placeholder cassé, mais une vraie page de teasing : grand titre
 * « Rien n'est encore écrit », inscription newsletter, lien YouTube.
 */
export const EmptyHome: React.FC = () => {
  return (
    <section className="container py-24 sm:py-32 lg:py-40 flex flex-col items-center text-center">
      <div className="appear" style={{ ['--i' as never]: 0 }}>
        <Logo size="full" />
      </div>

      <p
        className="kicker mt-12 appear"
        style={{ ['--i' as never]: 1 }}
      >
        Bientôt
      </p>

      <h1
        className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 leading-[1.05] max-w-3xl appear"
        style={{ ['--i' as never]: 2 }}
      >
        Rien n&apos;est <em className="not-italic text-green">encore</em> écrit.
      </h1>

      <p
        className="mt-8 max-w-xl text-ink-soft text-lg leading-relaxed appear"
        style={{ ['--i' as never]: 3 }}
      >
        Le magazine prend forme. Ici, on prendra le temps : analyses tactiques, histoire,
        récits longs, revues, podcasts. L&apos;inverse de l&apos;info instantanée.
      </p>

      <form
        className="mt-10 w-full max-w-md flex flex-col sm:flex-row gap-3 appear"
        style={{ ['--i' as never]: 4 }}
        action="/api/newsletter"
        method="post"
      >
        <label htmlFor="empty-newsletter" className="sr-only">
          Votre adresse e-mail
        </label>
        <input
          id="empty-newsletter"
          name="email"
          type="email"
          required
          placeholder="votre@email.fr"
          className="flex-1 bg-paper-dim/60 border border-line rounded-sm px-4 py-3 font-[var(--font-ui)] text-sm placeholder:text-ink-soft/60 focus:outline-none focus:border-green focus:bg-paper transition-colors"
        />
        <button
          type="submit"
          className="bg-ink text-paper px-5 py-3 rounded-sm font-[var(--font-ui)] text-sm font-semibold tracking-wide hover:bg-vermilion transition-colors"
        >
          Me prévenir
        </button>
      </form>

      <a
        href={YOUTUBE_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-10 kicker link-underline inline-flex items-center gap-2 appear"
        style={{ ['--i' as never]: 5 }}
      >
        <span aria-hidden>▶</span> Suivre la chaîne YouTube
      </a>

      <p
        className="mt-16 text-sm font-[var(--font-ui)] text-ink-soft/70 appear"
        style={{ ['--i' as never]: 6 }}
      >
        L&apos;analyse a le temps.
      </p>
    </section>
  )
}
