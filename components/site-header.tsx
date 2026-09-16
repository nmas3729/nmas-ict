'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const solutionsNav = [
  { label: 'Enterprise ICT Solutions', href: '/#portfolio' },
  { label: 'End User Computing', href: '/solutions/end-user-computing' },
  { label: 'Servers & Storage', href: '/solutions/servers-storage' },
  { label: 'Networking', href: '/solutions/networking' },
  { label: 'Software Licensing', href: '/solutions/software-licensing' },
  { label: 'Printing & Accessories', href: '/solutions/printing-accessories' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-[#020817]/95 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl'
          : 'border-b border-white/5 bg-[#020817]/80 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/#home" className="flex items-center gap-3" aria-label="NMAS Innovations home">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-3xl bg-[#071423] border border-[#4dd9ff]/15 shadow-[0_0_25px_rgba(77,217,255,0.18)]">
            <Image
              src="/images/nmas-logo.png"
              alt="NMAS Innovations logo"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
          </div>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-extrabold tracking-tight text-white">
              NMAS
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-300/70">
              Innovations
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          <Link href="/#home" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-tech-blue">
            Home
          </Link>
          <div className="relative" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
            <button
              type="button"
              onClick={() => setSolutionsOpen((value) => !value)}
              aria-expanded={solutionsOpen}
              className="flex items-center gap-1 rounded-md text-sm font-semibold text-muted-foreground transition-colors hover:text-tech-blue"
            >
              Solutions
              <ChevronDown className="h-4 w-4" />
            </button>
            {solutionsOpen && (
              <div className="absolute left-1/2 top-[calc(100%+0.75rem)] z-20 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#071423] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                {solutionsNav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSolutionsOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-[#4dd9ff]/10 hover:text-tech-blue"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/#about" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-tech-blue">
            About
          </Link>
          <Link href="/#target-markets" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-tech-blue">
            Target Markets
          </Link>
          <Link href="/#quality" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-tech-blue">
            Quality Assurance
          </Link>
          <Link href="/#contact" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-tech-blue">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-tech-blue px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-tech-blue-foreground transition-colors hover:bg-white hover:text-[#020817]"
          >
            Request Quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#071423] text-foreground lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          'overflow-y-auto border-t border-white/10 bg-[#020817] transition-[max-height] duration-300 ease-out lg:hidden',
          open ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          <Link
            href="/#home"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-[#4dd9ff]/10 hover:text-tech-blue"
          >
            Home
          </Link>
          <div className="px-3 py-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Solutions
              </span>
              <span className="rounded-full bg-[#4dd9ff]/10 px-2 py-1 text-[0.65rem] font-semibold text-[#4dd9ff]">
                5 categories
              </span>
            </div>
            <div className="flex flex-col gap-1 pl-4 border-l-2 border-[#4dd9ff]/20">
              {solutionsNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-2 text-base font-semibold text-muted-foreground transition-colors hover:bg-[#4dd9ff]/10 hover:text-tech-blue"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/#about"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-[#4dd9ff]/10 hover:text-tech-blue"
          >
            About
          </Link>
          <Link
            href="/#target-markets"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-[#4dd9ff]/10 hover:text-tech-blue"
          >
            Target Markets
          </Link>
          <Link
            href="/#quality"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-3 py-3 text-base font-semibold text-muted-foreground transition-colors hover:bg-[#4dd9ff]/10 hover:text-tech-blue"
          >
            Quality Assurance
          </Link>
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#4dd9ff] px-4 py-3 text-base font-semibold uppercase tracking-[0.08em] text-[#020817] transition-colors hover:bg-white"
          >
            Request Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
