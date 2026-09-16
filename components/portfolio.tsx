'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Laptop, Server, Network, Printer, Video, KeyRound, Zap, Mouse } from 'lucide-react'

const portfolioCategories = [
  {
    id: 'euc',
    icon: Laptop,
    title: 'End User Computing',
    image: '/images/hero-enterprise-new.webp',
    products: ['Business laptops', 'Desktop PCs', 'Workstations', 'Tablets', 'Monitors', 'Docking stations'],
    brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Apple', 'Microsoft']
  },
  {
    id: 'servers',
    icon: Server,
    title: 'Servers & Storage',
    image: '/images/server-room.webp',
    products: ['Servers', 'Storage systems', 'Backup solutions'],
    brands: ['Dell', 'HPE', 'Lenovo', 'Synology']
  },
  {
    id: 'networking',
    icon: Network,
    title: 'Networking',
    image: '/images/server-room.webp',
    products: ['Switches', 'Routers', 'Wireless', 'Firewalls'],
    brands: ['Cisco', 'Aruba', 'Ubiquiti', 'MikroTik']
  },
  {
    id: 'software',
    icon: KeyRound,
    title: 'Software Licensing',
    image: '/images/it-team.webp',
    products: ['Microsoft licensing', 'Security software', 'Business software'],
    brands: ['Microsoft', 'Bitdefender', 'Sophos', 'ESET', 'Trend Micro']
  },
  {
    id: 'printing',
    icon: Printer,
    title: 'Printing & Accessories',
    image: '/images/it-team.webp',
    products: ['Printers', 'Consumables', 'ICT accessories'],
    brands: ['HP', 'Canon', 'Epson', 'Brother', 'Logitech', 'Targus']
  }
]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(portfolioCategories[0].id)

  return (
    <section id="portfolio" className="bg-[#020817] py-20 lg:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-[#4dd9ff]">
            Enterprise Product Portfolio
          </span>
          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Complete ICT Hardware, Software Licensing & Technology Solutions
          </h2>
          <p className="mt-4 text-lg text-slate-300/80">
            NMAS Innovations supplies brand-new genuine ICT equipment, software licensing and enterprise technology solutions through trusted distribution channels.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/3 flex flex-col gap-2">
            {portfolioCategories.map((category) => {
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl transition-all font-bold text-lg ${
                    isActive 
                      ? 'bg-[#0a1128] text-white shadow-lg shadow-[#0a1128]/20 translate-x-2' 
                      : 'bg-[#071423]/70 text-slate-200 hover:bg-[#0a1128]/70 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <category.icon className={`h-6 w-6 ${isActive ? 'text-[#00b4d8]' : 'text-slate-300/60'}`} />
                  {category.title}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3 bg-[#071423]/70 rounded-2xl border border-white/10 p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4dd9ff]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <AnimatePresence mode="wait">
              {portfolioCategories.map((category) => (
                category.id === activeCategory && (
                  <motion.div
                    key={category.id}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 mb-8">
                      <div className="relative w-full lg:w-1/2 h-48 rounded-xl overflow-hidden shadow-sm border border-white/10 bg-[#071423]/50">
                        <Image src={category.image} alt={`${category.title} supplied by NMAS Innovations`} fill sizes="(max-width: 1024px) 100vw, 32vw" className="object-cover" />
                      </div>
                      <div className="w-full lg:w-1/2 flex items-center">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-[#0a1128] text-[#4dd9ff] rounded-xl">
                            <category.icon className="h-8 w-8" />
                          </div>
                          <h3 className="font-heading text-2xl lg:text-3xl font-extrabold text-white">
                            {category.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-300/60 mb-4 border-b border-white/10 pb-2">Products</h4>
                        <ul className="space-y-2">
                          {category.products.map((product) => (
                            <li key={product} className="flex items-center gap-2 text-slate-300/80 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" />
                              {product}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-300/60 mb-4 border-b border-white/10 pb-2">Trusted Brands</h4>
                        <ul className="space-y-2">
                          {category.brands.map((brand) => (
                            <li key={brand} className="flex items-center gap-2 text-white font-bold">
                              {brand}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
