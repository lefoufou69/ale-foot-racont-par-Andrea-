'use client'

import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/70 sticky top-0 z-30">
      <div className="container flex items-center justify-between gap-6 py-5 sm:py-6">
        <Link href="/" className="shrink-0" aria-label="Accueil">
          <Logo size="compact" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
