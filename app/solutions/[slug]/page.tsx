import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Contact } from '@/components/contact'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

// Define the content strictly matching the user's requirements
const solutionsContent: Record<string, any> = {
  'end-user-computing': {
    title: 'End User Computing',
    description: 'Enterprise-grade end user computing hardware and accessories for modern workspaces.',
    products: ['Business laptops', 'Desktops', 'Workstations', 'Tablets', 'Monitors', 'Docking stations'],
    brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Apple', 'Microsoft']
  },
  'servers-storage': {
    title: 'Servers & Storage',
    description: 'Enterprise server, storage and backup solutions for organisational requirements.',
    products: ['Servers', 'Storage systems', 'Backup solutions'],
    brands: ['Dell', 'HPE', 'Lenovo', 'Synology']
  },
  'networking': {
    title: 'Networking',
    description: 'Connectivity infrastructure for offices, campuses and enterprise environments.',
    products: ['Switches', 'Routers', 'Wireless equipment', 'Firewalls', 'Network accessories'],
    brands: ['Cisco', 'Aruba', 'Ubiquiti', 'MikroTik']
  },
  'software-licensing': {
    title: 'Software Licensing',
    description: 'Software licensing supplied for organisational deployments.',
    products: ['Microsoft licensing', 'Security software', 'Enterprise software solutions'],
    brands: ['Microsoft', 'Bitdefender', 'Sophos', 'ESET', 'Trend Micro']
  },
  'printing-accessories': {
    title: 'Printing & Accessories',
    description: 'Professional printing solutions and IT accessories for document management and workspaces.',
    products: ['Printers', 'Multifunction printers', 'Scanners', 'Toners', 'Accessories'],
    brands: ['HP', 'Canon', 'Epson', 'Brother', 'Logitech', 'Targus']
  },
  'collaboration': {
    title: 'Collaboration',
    description: 'Meeting room and communication technology for modern organisations.',
    products: ['Video conferencing', 'Meeting room technology', 'Communication equipment'],
    brands: ['Yealink', 'Logitech', 'Poly', 'Jabra']
  }
}

export function generateStaticParams() {
  return Object.keys(solutionsContent).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = solutionsContent[slug]

  if (!content) {
    return {}
  }

  return {
    title: `${content.title} | NMAS Innovations`,
    description: content.description,
    alternates: {
      canonical: `https://nmas.co.za/solutions/${slug}`,
    },
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = solutionsContent[slug]

  if (!content) {
    notFound()
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-[#020817] pb-20 pt-28 lg:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/#portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300/70 transition-colors hover:text-[#57d8ef]">
            <ArrowLeft className="h-4 w-4" />
            Back to Solutions
          </Link>
          
          <div className="relative mb-16 overflow-hidden rounded-2xl border border-white/10 bg-[#071423] p-8 lg:p-16">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#0d3a54]/30 to-transparent" />
            <span className="relative text-sm font-bold uppercase tracking-[0.16em] text-[#57d8ef]">
              Enterprise Solution
            </span>
            <h1 className="relative mt-4 max-w-3xl font-heading text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
              {content.title}
            </h1>
            <p className="relative mt-6 max-w-2xl text-lg leading-relaxed text-white/75 lg:text-xl">
              {content.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-20">
            <div>
              <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-extrabold text-white">
                Products Supplied
              </h2>
              <ul className="space-y-4">
                {content.products.map((product: string) => (
                  <li key={product} className="flex items-center gap-3 text-lg font-medium text-slate-300/80">
                    <CheckCircle2 className="h-6 w-6 text-[#00b4d8] shrink-0" />
                    {product}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="mb-6 border-b border-white/10 pb-4 text-2xl font-extrabold text-white">
                Trusted Brands
              </h2>
              <ul className="flex flex-wrap gap-3">
                {content.brands.map((brand: string) => (
                  <li key={brand} className="rounded-lg border border-white/10 bg-[#071423] px-5 py-3 text-lg font-bold text-slate-200">
                    {brand}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
