import {
  Laptop,
  Server,
  Network,
  KeyRound,
  Monitor,
  PackageCheck,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const solutions = [
  {
    icon: Laptop,
    title: 'Business Computers',
    description:
      'New laptops, desktops and workstations for professional organisational use.',
  },
  {
    icon: Server,
    title: 'Servers & Storage',
    description:
      'New server and storage equipment for organisational technology requirements.',
  },
  {
    icon: Network,
    title: 'Networking Equipment',
    description:
      'New networking hardware for business and institutional environments.',
  },
  {
    icon: KeyRound,
    title: 'Software Licensing',
    description:
      'Software licensing procurement for organisations and their users.',
  },
  {
    icon: Monitor,
    title: 'ICT Equipment',
    description:
      'New technology equipment sourced to meet stated customer requirements.',
  },
  {
    icon: PackageCheck,
    title: 'Procurement Solutions',
    description:
      'Technology procurement support for defined equipment and licensing needs.',
  },
]

export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-20 bg-muted/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-tech-blue">
            Our Solutions
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            ICT supply for organisations and individuals
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            NMAS Innovations provides new technology equipment, software licensing
            and procurement solutions for organisations and individual customers.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 90}>
              <article className="group h-full rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-tech-blue/40 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-navy-foreground transition-colors group-hover:bg-tech-blue">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
