'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const navigation = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Markets', href: '/markets' },
  { label: 'About', href: '/about' },
  { label: 'Quality Assurance', href: '/about#quality' },
  { label: 'Contact', href: '/contact' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#050c18]/95 text-white backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:min-h-[76px] lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 rounded-sm" aria-label="NMAS Innovations home">
          <Image
            src="/images/nmas-logo.png"
            alt=""
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-extrabold tracking-tight text-white">NMAS</span>
            <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-slate-400">Innovations</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-sm text-sm font-medium text-slate-300 transition-colors hover:text-cyan-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#071321] transition-colors hover:bg-cyan-100 sm:text-sm lg:min-h-11 lg:px-5"
        >
          <span className="sm:hidden">Quote</span>
          <span className="hidden sm:inline">Request Quote</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-slate-700 text-white hover:bg-white/5 lg:hidden"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        hidden={!menuOpen}
        className="border-t border-white/[0.08] bg-[#071321] px-4 py-4 shadow-lg lg:hidden"
        aria-label="Mobile navigation"
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1">
          {navigation.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-3 font-medium text-slate-200 hover:bg-white/5 hover:text-cyan-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 py-3 font-semibold text-slate-950 hover:bg-cyan-200"
            >
              Request Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
