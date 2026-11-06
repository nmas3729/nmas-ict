import Image from 'next/image'
import Link from 'next/link'

const footerColumns = [
  {
    title: 'Portfolio',
    links: [
      ['End User Computing', '/solutions#end-user-computing'],
      ['Servers & Storage', '/solutions#servers-storage'],
      ['Networking', '/solutions#networking'],
      ['Software Licensing', '/solutions#software-licensing'],
      ['Printing & Accessories', '/solutions#printing-accessories'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Us', '/about'],
      ['Target Markets', '/markets'],
      ['Quality Assurance', '/about#quality'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Sectors',
    links: [
      ['Government', '/markets'],
      ['Municipalities', '/markets'],
      ['TVET Colleges', '/markets'],
      ['Enterprise', '/markets'],
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pb-10 sm:pt-20 lg:px-8">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))] lg:gap-x-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 rounded-sm" aria-label="NMAS Innovations home">
              <Image src="/images/nmas-logo.png" alt="" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg font-extrabold">NMAS</span>
                <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-slate-300">Innovations</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-slate-300">
              South African ICT supplier serving organisations and individuals.
            </p>
            <p className="mt-4 text-slate-400">Company Registration No. 2023/727067/07</p>
            <p className="mt-4 max-w-sm leading-relaxed text-slate-300">
              New ICT equipment, software licensing and procurement support.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-white">{column.title}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="rounded-sm text-sm text-slate-300 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 border-t border-white/15 pt-7 text-sm text-slate-300 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
          <p>© 2026 NMAS Innovations. All rights reserved.</p>
          <p>ICT Solutions · South Africa</p>
          <p>
            Design &amp; hosted by{' '}
            <a
              href="https://sihleb.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline decoration-slate-500 underline-offset-4 transition-colors hover:text-white"
            >
              SihleB Digital Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
