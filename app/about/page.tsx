import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { About } from '@/components/about'
import { Quality } from '@/components/quality'
import { PageIntro, PageLayout } from '@/components/page-layout'

export const metadata: Metadata = {
  title: 'Company Profile',
  description: 'Learn about NMAS Innovations, its company profile, founder experience and quality assurance approach as a South African supplier to organisations and individuals.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About NMAS Innovations',
    description: 'Company profile, founder experience and quality assurance information.',
    url: '/about',
  },
}

export default function AboutPage() {
  return (
    <PageLayout>
      <PageIntro
        eyebrow="Company profile"
        title="About NMAS Innovations"
        description="A South African ICT supplier and reseller providing technology products and software licensing to organisations and individuals."
        showBackToHome
      />
      <About />
      <Quality />
      <section className="border-t border-white/[0.07] bg-[#050c18] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl rounded-xl border border-slate-700/70 bg-[#0a1424] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Information Officer</p>
            <h2 className="mt-2 font-heading text-xl font-bold text-white">
              Information Officer registration
            </h2>
            <dl className="mt-5 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-400">Organisation</dt>
                <dd className="mt-1 font-medium text-slate-200">NMAS Innovations</dd>
              </div>
              <div>
                <dt className="text-slate-400">Information Officer Registration No.</dt>
                <dd className="mt-1 font-medium text-slate-200">2026-069307</dd>
              </div>
              <div>
                <dt className="text-slate-400">Company Registration No.</dt>
                <dd className="mt-1 font-medium text-slate-200">2023/727067/07</dd>
              </div>
              <div>
                <dt className="text-slate-400">Information Officer</dt>
                <dd className="mt-1 font-medium text-slate-200">BEQEZI, MZOXOLO</dd>
              </div>
              <div>
                <dt className="text-slate-400">Appointment date</dt>
                <dd className="mt-1 font-medium text-slate-200">10 May 2023</dd>
              </div>
              <div>
                <dt className="text-slate-400">Certificate issue date</dt>
                <dd className="mt-1 font-medium text-slate-200">15 October 2026</dd>
              </div>
            </dl>
            <a
              href="https://eservices.inforegulator.org.za"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-sm text-sm font-semibold text-cyan-300 underline decoration-cyan-300/50 underline-offset-4 hover:text-cyan-200"
            >
              Verify via the Information Regulator
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
      <section className="border-t border-white/[0.07] bg-[#050c18] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">Discuss your ICT requirements</h2>
            <p className="mt-2 text-slate-400">Contact NMAS Innovations for procurement support.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 hover:bg-cyan-200">
            Contact NMAS <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
