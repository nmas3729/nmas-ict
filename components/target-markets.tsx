import { BookOpen, Building2, GraduationCap, Landmark, BriefcaseBusiness, Building, UserRound } from 'lucide-react'

const markets = [
  {
    icon: Building2,
    title: 'Corporate Organisations',
    description: 'Enterprise-grade ICT hardware and licensing for large-scale operations and data centres.',
  },
  {
    icon: Landmark,
    title: 'Government Departments',
    description: 'ICT equipment, software licensing and procurement support for public-sector technology requirements.',
  },
  {
    icon: Building,
    title: 'Municipalities',
    description: 'Reliable networking and computing equipment for municipal service delivery operations.',
  },
  {
    icon: BookOpen,
    title: 'TVET Colleges',
    description: 'Technology equipment for technical and vocational education environments.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Institutions',
    description: 'IT solutions for universities, schools and academic administration.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'SMEs',
    description: 'Scalable business hardware and software licensing for growing enterprises.',
  },
  {
    icon: UserRound,
    title: 'Individual Customers',
    description: 'Individuals can enquire with NMAS about genuine ICT equipment and software licensing for their requirements.',
  },
]

export function TargetMarkets() {
  return (
    <section id="target-markets" className="scroll-mt-24 bg-[#050c18] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Target markets</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            ICT Solutions for Organisations and Individuals
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Enquiries for genuine ICT equipment and software licensing from organisations and individual customers.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-xl border border-slate-700/70 bg-[#0a1424] p-6 transition-colors hover:border-cyan-300/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-white">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate-400">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
