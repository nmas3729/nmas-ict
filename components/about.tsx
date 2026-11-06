import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

const distributionHighlights = [
  'Authentic products',
  'Manufacturer warranty',
  'Procurement confidence',
]

const reasons = [
  'ICT supplier for organisations and individuals',
  'More than 20 years of founder ICT experience',
  'Enterprise technology sourcing',
  'Procurement support',
  'South African business presence',
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#050c18] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-[#0a1424]">
          <Image
            src="/images/it-team.webp"
            alt="Technology professionals discussing ICT requirements"
            width={1000}
            height={800}
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="aspect-[5/4] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Company profile</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            A South African ICT Supplier
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            <p>
              NMAS Innovations (Pty) Ltd is a South African ICT supplier and reseller providing genuine technology products and software licensing to organisations and individuals.
            </p>
            <p>
              We support businesses, government departments, municipalities, educational institutions, individuals and other customers with technology sourced through trusted distribution channels.
            </p>
            <p>
              Our founder started working in ICT in 2001 and brings more than 20 years of experience in IT support, technology sourcing and ICT procurement environments.
            </p>
            <p className="text-sm font-medium text-slate-300">
              Company Registration No. 2023/727067/07
            </p>
          </div>

          <div className="mt-8 grid gap-8 border-t border-slate-700/70 pt-7 sm:grid-cols-2">
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Trusted Distribution</h3>
              <ul className="mt-3 space-y-2">
                {distributionHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Why Choose NMAS</h3>
              <ul className="mt-3 space-y-2">
                {reasons.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
