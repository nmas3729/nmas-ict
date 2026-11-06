import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

const services = ['Hardware procurement', 'Software licensing', 'Nationwide distribution']

const trustHighlights = [
  '100% Black-Owned',
  '36% Black Woman-Owned',
  '36% Black Youth-Owned',
  'Level 1 B-BBEE',
  'Fully Tax Compliant',
  '20+ Years ICT Experience',
]

export function Hero() {
  return (
    <section id="home" className="scroll-mt-20 bg-[#050c18] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" aria-hidden="true" />
            South African ICT solutions for organisations and individuals
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.55rem]">
            Future-ready ICT hardware, <span className="text-cyan-300">software licensing</span> &amp; technology supply solutions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            NMAS Innovations is a trusted South African ICT supplier, delivering genuine hardware, software licensing and technology procurement services across government, corporate, education and individual customer requirements.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-200">
            {services.map((service) => (
              <li key={service} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="h-4 w-4 text-cyan-300" />
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-cyan-200"
            >
              Request an ICT Supplier Quote
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white/50 hover:bg-white/5"
            >
              View Solutions
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0b1626] shadow-2xl shadow-black/30">
            <Image
              src="/images/hero-enterprise-new.webp"
              alt="Technology professionals collaborating in a modern meeting room"
              width={1280}
              height={1280}
              priority
              fetchPriority="high"
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 46vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08] bg-[#070f1d]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:grid-cols-6 lg:px-8">
          {trustHighlights.map((item) => (
            <div key={item} className="flex min-h-[68px] items-center justify-center rounded-lg border border-slate-700/60 bg-[#0b1626] px-3 py-4 text-center text-sm font-semibold leading-snug text-slate-200 sm:px-4">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
