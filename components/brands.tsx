const technologyBrands = ['HP', 'Dell', 'ASUS', 'ESET', 'Lenovo', 'Microsoft'] as const

export function Brands() {
  return (
    <section id="technology-brands" className="border-y border-white/[0.07] bg-[#08111f] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Technology brands</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Technology Brands
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          We source technology from established brands to meet customer requirements.
        </p>
        <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {technologyBrands.map((brand) => (
            <li key={brand} className="flex min-h-20 items-center justify-center rounded-xl border border-slate-700/70 bg-[#0b1626] px-4 text-lg font-bold tracking-tight text-slate-200">
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
