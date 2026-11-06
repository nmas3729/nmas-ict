import {
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  Package,
  Search,
  Settings,
  ShieldCheck,
  Truck,
} from 'lucide-react'

const procurementSteps = [
  { title: 'Submit RFQ or Bill of Quantities', icon: FileText },
  { title: 'Review Requirements', icon: Search },
  { title: 'Validate Specifications', icon: ClipboardCheck },
  { title: 'Product Sourcing', icon: Package },
  { title: 'Competitive Quotation', icon: CircleDollarSign },
  { title: 'Order Processing', icon: Settings },
  { title: 'Nationwide Delivery', icon: Truck },
  { title: 'Manufacturer Warranty & Support', icon: ShieldCheck },
] as const

export function Workflow() {
  return (
    <section id="procurement-process" className="border-y border-white/[0.07] bg-[#081321] py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Procurement process</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            A clear path from RFQ to supply
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Share your requirements and move through each procurement stage with support from NMAS. Manufacturer warranty enquiries are coordinated through the relevant manufacturer or distribution channel.
          </p>
        </div>

        <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {procurementSteps.map(({ title, icon: Icon }, index) => (
            <li key={title} className="workflow-step relative flex flex-col items-center px-2 text-center">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/30 bg-[#0b1a2c] text-cyan-300">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <span className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
                Step {index + 1}
              </span>
              <h3 className="mt-2 max-w-56 font-semibold leading-relaxed text-slate-100">{title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
