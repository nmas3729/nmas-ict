import Link from 'next/link'
import { ArrowRight, Building2, KeyRound, Laptop, Network, Server, Printer } from 'lucide-react'

const solutionPreviews = [
  { title: 'End User Computing', icon: Laptop },
  { title: 'Servers & Storage', icon: Server },
  { title: 'Networking', icon: Network },
  { title: 'Software Licensing', icon: KeyRound },
  { title: 'Printing & Accessories', icon: Printer },
] as const

const marketPreviews = ['Corporate organisations', 'Government departments', 'Municipalities', 'Education', 'SMEs', 'Individual customers'] as const
const servicePreviews = [
  'Genuine ICT hardware sourcing and supply',
  'Software licensing',
  'RFQ review and procurement support',
  'Nationwide distribution and warranty coordination',
] as const

export function HomePreviews() {
  return (
    <>
      <section className="border-y border-white/[0.07] bg-[#08111f] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Solutions</p>
              <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                ICT solutions for organisations and individuals
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
                Genuine equipment sourcing, software licensing, quotation and procurement assistance.
              </p>
            </div>
            <Link href="/solutions" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Explore solutions <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {solutionPreviews.map(({ title, icon: Icon }) => (
              <li key={title}>
                <Link
                  href="/solutions"
                  className="flex min-h-20 items-center gap-3 rounded-xl border border-slate-700/70 bg-[#0a1424] p-4 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-300/40 hover:text-white"
                >
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-cyan-300" />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-7 border-t border-slate-700/70 pt-6">
            <h3 className="text-sm font-semibold text-slate-200">Services currently available</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {servicePreviews.map((service) => (
                <li key={service} className="rounded-full border border-slate-700 bg-[#101c2d] px-3 py-1.5 text-xs font-medium text-slate-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#050c18] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Markets</p>
            <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Supporting organisations and individuals
            </h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              South African ICT product and licensing enquiries for organisations and individual customers.
            </p>
            <Link href="/markets" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              View target markets <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-slate-700/70 bg-[#0a1424] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
                <Building2 aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Organisations and individuals</h3>
                <p className="mt-2 leading-relaxed text-slate-400">
                  Explore the sectors and customer groups NMAS supports, including individual enquiries.
                </p>
              </div>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {marketPreviews.map((market) => (
                <li key={market} className="rounded-full border border-slate-700 bg-[#101c2d] px-3 py-1.5 text-xs font-medium text-slate-300">
                  {market}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.07] bg-[#081321] py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
              <h2 className="font-heading text-2xl font-bold text-white">Have an ICT requirement?</h2>
            <p className="mt-2 text-slate-400">Individuals and organisations can share requirements with NMAS Innovations.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 hover:bg-cyan-200">
            Request a Quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
