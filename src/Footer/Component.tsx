import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

/** Lien YouTube de la chaîne — surchargeable via le global Footer plus tard. */
const YOUTUBE_URL = 'https://www.youtube.com/@dédéap69'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-24 bg-green-deep text-paper">
      <div className="container py-14 flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
        <div className="flex flex-col gap-4 max-w-md">
          <Link href="/" aria-label="Accueil">
            <Logo size="compact" tone="paper" />
          </Link>
          <p className="text-paper/70 font-[var(--font-body)] text-[15px] leading-relaxed">
            Un magazine pour prendre le temps : analyses tactiques, histoire, récits longs. Pas de
            live, pas de mercato minute par minute. <em className="text-green-soft not-italic">L&apos;analyse a le temps.</em>
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          {navItems.length > 0 && (
            <nav
              aria-label="Pied de page"
              className="flex flex-col gap-2 font-[var(--font-ui)] text-sm tracking-wide md:items-end"
            >
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  {...link}
                  className="text-paper/80 hover:text-paper link-underline"
                />
              ))}
            </nav>
          )}

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="kicker !text-green-soft hover:!text-paper transition-colors inline-flex items-center gap-2"
          >
            <span aria-hidden>▶</span> Chaîne YouTube
          </a>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="container py-5 text-xs font-[var(--font-ui)] text-paper/60 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Le foot raconté par Andrea Planet.</span>
          <span className="tabular">Magazine indépendant — édité depuis Lyon.</span>
        </div>
      </div>
    </footer>
  )
}
