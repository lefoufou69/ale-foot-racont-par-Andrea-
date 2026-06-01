'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-5 sm:gap-7 font-[var(--font-ui)] text-sm tracking-wide">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className="link-underline text-ink-soft hover:text-ink transition-colors"
          />
        )
      })}
      <Link
        href="/search"
        className="text-ink-soft hover:text-vermilion transition-colors"
        aria-label="Rechercher"
      >
        <SearchIcon className="w-5 h-5" />
      </Link>
    </nav>
  )
}
