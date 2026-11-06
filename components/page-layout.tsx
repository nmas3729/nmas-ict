import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-white px-4 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  )
}

export function PageIntro({
  eyebrow,
  title,
  description,
  showBackToHome = false,
}: {
  eyebrow: string
  title: string
  description: string
  showBackToHome?: boolean
}) {
  return (
    <section className="border-b border-white/[0.07] bg-[#050c18] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showBackToHome && (
          <Link
            href="/"
            aria-label="Back to NMAS home"
            className="group mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/40 bg-[#091726] p-1.5 text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.06)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-cyan-200/70 hover:bg-[#0b1c2d] hover:shadow-[0_0_18px_rgba(34,211,238,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 motion-safe:hover:-translate-y-0.5 motion-safe:transition-all motion-reduce:transition-none"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-4 w-4 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-x-0.5"
            />
          </Link>
        )}
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
