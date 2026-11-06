import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function Infrastructure() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-tech-blue">
              ICT Equipment Procurement
            </span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              New technology equipment sourced for customer requirements
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              NMAS Innovations supplies new ICT equipment for defined business and
              institutional needs, including computing, server, storage and
              networking hardware.
            </p>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-base font-semibold text-navy-foreground transition-all hover:bg-tech-blue"
            >
              Discuss your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="/images/server-room.webp"
                alt="Modern enterprise data centre server room with network racks"
                width={1000}
                height={750}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
