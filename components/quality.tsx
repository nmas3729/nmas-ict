import { Check, X } from 'lucide-react'

const supplied = [
  'Genuine manufacturer products',
  'Manufacturer warranty',
  'New equipment only',
  'Trusted supply channels',
  'Professional quotation support',
] as const

const notSupplied = ['Used equipment', 'Refurbished equipment', 'Grey imports'] as const

export function Quality() {
  return (
    <section id="quality" className="scroll-mt-24 bg-[#071321] py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Quality assurance</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            New, genuine ICT products
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            NMAS Innovations supplies brand-new genuine ICT products sourced through trusted distribution channels.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <section aria-labelledby="supplies-heading" className="rounded-xl border border-slate-700/70 bg-[#0b192a] p-6 sm:p-7">
            <h3 id="supplies-heading" className="font-heading text-lg font-bold text-white">Customers receive</h3>
            <ul className="mt-5 space-y-3">
              {supplied.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="not-supplied-heading" className="rounded-xl border border-slate-700/70 bg-[#0b192a] p-6 sm:p-7">
            <h3 id="not-supplied-heading" className="font-heading text-lg font-bold text-white">NMAS does not supply</h3>
            <ul className="mt-5 space-y-3">
              {notSupplied.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                  <X aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
