import Image from 'next/image'
import Link from 'next/link'

const columns = [
  {
    title: 'Portfolio',
    links: [
      ['End User Computing', '/solutions/end-user-computing'],
      ['Servers & Storage', '/solutions/servers-storage'],
      ['Networking', '/solutions/networking'],
      ['Software Licensing', '/solutions/software-licensing'],
      ['Printing & Accessories', '/solutions/printing-accessories'],
    ],
  },
  {
    title: 'Company',
    links: [['About Us', '/#about'], ['Target Markets', '/#target-markets'], ['Quality Assurance', '/#quality'], ['Contact', '/#contact']],
  },
  {
    title: 'Sectors',
    links: [['Government', '/#target-markets'], ['Municipalities', '/#target-markets'], ['TVET Colleges', '/#target-markets'], ['Enterprise', '/#target-markets']],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/nmas-logo.png"
                alt="NMAS Innovations logo"
                width={44}
                height={44}
                className="h-10 w-10"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg font-extrabold tracking-tight text-navy">
                  NMAS
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Innovations
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              <strong>NMAS Innovations (Pty) Ltd</strong><br />
              South African B2B ICT Supplier<br /><br />
              Providing:<br />
              • New ICT equipment<br />
              • Software licensing<br />
              • Procurement solutions<br /><br />
              <span className="font-bold">Serving organisational buyers only.</span>
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-navy">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-tech-blue">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NMAS Innovations. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Enterprise ICT Supplier · South Africa
          </p>
          <p className="text-xs text-muted-foreground/70">
            Website designed by{' '}
            <a href="https://sihleb.co.za" target="_blank" rel="noreferrer" className="font-medium text-muted-foreground underline decoration-white/20 underline-offset-4 transition-colors hover:text-tech-blue">
              SihleB Digital Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
