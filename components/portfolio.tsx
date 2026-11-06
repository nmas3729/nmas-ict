'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { KeyRound, Laptop, Network, Printer, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type PortfolioCategory = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  products?: readonly string[]
  brands?: readonly string[]
}

const portfolioCategories = [
  {
    id: 'end-user-computing',
    title: 'End User Computing',
    description: 'Computing devices and accessories for organisational users.',
    icon: Laptop,
    products: ['Business laptops', 'Desktop PCs', 'Workstations', 'Tablets', 'Monitors', 'Docking stations'],
    brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Apple', 'Microsoft'],
  },
  {
    id: 'servers-storage',
    title: 'Servers & Storage',
    description: 'Server and storage solutions for infrastructure requirements.',
    icon: Server,
  },
  {
    id: 'networking',
    title: 'Networking',
    description: 'Networking equipment for organisational connectivity requirements.',
    icon: Network,
  },
  {
    id: 'software-licensing',
    title: 'Software Licensing',
    description: 'Software licensing for personal and organisational requirements.',
    icon: KeyRound,
  },
  {
    id: 'printing-accessories',
    title: 'Printing & Accessories',
    description: 'Printing and accessory solutions for workplace requirements.',
    icon: Printer,
  },
] satisfies readonly PortfolioCategory[]

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    function selectCategoryFromHash() {
      const index = portfolioCategories.findIndex(({ id }) => id === window.location.hash.slice(1))
      if (index >= 0) setActiveIndex(index)
    }

    selectCategoryFromHash()
    window.addEventListener('hashchange', selectCategoryFromHash)
    return () => window.removeEventListener('hashchange', selectCategoryFromHash)
  }, [])

  function selectTab(index: number) {
    setActiveIndex(index)
    window.history.replaceState(null, '', `#${portfolioCategories[index].id}`)
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | undefined
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % portfolioCategories.length
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + portfolioCategories.length) % portfolioCategories.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = portfolioCategories.length - 1
    }

    if (nextIndex !== undefined) {
      event.preventDefault()
      selectTab(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  return (
    <section id="portfolio" className="scroll-mt-24 border-y border-white/[0.07] bg-[#08111f] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Enterprise product portfolio</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Technology for the way your organisation works
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Explore the main procurement categories. Share your specifications in an RFQ for a tailored quotation.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Product categories"
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {portfolioCategories.map(({ id, title, icon: Icon }, index) => (
              <button
                key={id}
                ref={(element) => { tabRefs.current[index] = element }}
                id={id}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`${id}-panel`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`inline-flex min-h-12 shrink-0 items-center gap-3 rounded-lg border px-4 text-left text-sm font-semibold transition-colors lg:w-full ${
                  activeIndex === index
                    ? 'border-cyan-300/40 bg-cyan-300/[0.09] text-cyan-200'
                    : 'border-slate-700/70 bg-[#0a1424] text-slate-300 hover:border-slate-500'
                }`}
              >
                <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                {title}
              </button>
            ))}
          </div>

          {portfolioCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                id={`${category.id}-panel`}
                role="tabpanel"
                aria-labelledby={category.id}
                tabIndex={0}
                hidden={activeIndex !== index}
                className={`min-h-72 rounded-xl border border-slate-700/70 bg-[#0a1424] p-6 sm:p-8 ${
                  activeIndex !== index ? 'hidden' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.07] text-cyan-300">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{category.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-400">{category.description}</p>
                  </div>
                </div>

                {category.products && category.brands && (
                  <div className="mt-7 grid gap-6 border-t border-slate-700/70 pt-6 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Products</h4>
                      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-slate-400">
                        {category.products.map((product) => <li key={product}>{product}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Brands</h4>
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="End User Computing brands">
                        {category.brands.map((brand) => (
                          <li key={brand} className="rounded-full border border-slate-700 bg-[#101c2d] px-3 py-1 text-xs font-semibold text-slate-300">
                            {brand}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
