import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TargetMarkets } from '@/components/target-markets'
import { PageIntro, PageLayout } from '@/components/page-layout'

export const metadata: Metadata = {
  title: 'Target Markets',
  description: 'ICT equipment and software licensing enquiries for individual customers, corporate organisations, government departments, municipalities, education institutions and SMEs.',
  alternates: { canonical: '/markets' },
  openGraph: {
    title: 'Target Markets | NMAS Innovations',
    description: 'Learn about the organisations and individual customers NMAS Innovations supports with ICT enquiries.',
    url: '/markets',
  },
}

export default function MarketsPage() {
  return (
    <PageLayout>
      <PageIntro
        eyebrow="Who we serve"
        title="ICT Solutions for Organisations and Individuals"
        description="NMAS Innovations supports technology requirements across public and private sectors and welcomes individual enquiries about genuine ICT equipment and software licensing."
        showBackToHome
      />
      <TargetMarkets />
      <section className="border-t border-white/[0.07] bg-[#081321] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">Have an ICT requirement?</h2>
            <p className="mt-2 text-slate-400">Individuals and organisations can contact NMAS with their requirements.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 hover:bg-cyan-200">
            Contact NMAS <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
