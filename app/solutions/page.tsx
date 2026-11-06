import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Portfolio } from '@/components/portfolio'
import { Workflow } from '@/components/workflow'
import { PageIntro, PageLayout } from '@/components/page-layout'
import { supportedServices } from '@/lib/services'

export const metadata: Metadata = {
  title: 'Solutions and Product Portfolio',
  description: 'Explore ICT equipment sourcing, software licensing, quotation and procurement support, and product categories for individuals and organisations.',
  alternates: { canonical: '/solutions' },
  openGraph: {
    title: 'Solutions and Product Portfolio | NMAS Innovations',
    description: 'ICT services, product categories and procurement process for organisations and individuals.',
    url: '/solutions',
  },
}

export default function SolutionsPage() {
  return (
    <PageLayout>
      <PageIntro
        eyebrow="Solutions"
        title="Solutions and Product Portfolio"
        description="Explore the services and product categories available to organisations and individual customers. Share your requirements for a quotation."
        showBackToHome
      />
      <section className="bg-[#050c18] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Current services</p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Sourcing and procurement support
            </h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              These services support organisations and individuals with ICT equipment and licensing enquiries.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportedServices.map(({ title, description }) => (
              <li key={title} className="rounded-xl border border-slate-700/70 bg-[#0a1424] p-5">
                <h3 className="font-heading text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Portfolio />
      <Workflow />
      <section className="border-t border-white/[0.07] bg-[#050c18] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">Looking for a quote?</h2>
            <p className="mt-2 text-slate-400">Send your product requirements or RFQ / Bill of Quantities.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 hover:bg-cyan-200">
            Request a Quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
