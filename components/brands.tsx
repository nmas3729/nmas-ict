const brandNames = ['HP', 'Dell', 'ASUS', 'ESET', 'Lenovo', 'Microsoft']

const BrandLogo = ({ name }: { name: string }) => (
  <svg
    viewBox="0 0 200 60"
    role="img"
    aria-label={`${name} logo`}
    className="h-14 w-full object-contain text-slate-200/90 transition-colors duration-200 group-hover:text-[#57d8ef] sm:h-16"
  >
    <rect width="200" height="60" fill="transparent" />
    <text 
      x="100" 
      y="35" 
      fontFamily="var(--font-inter), sans-serif"
      fontSize="24" 
      fontWeight="800" 
      fill="currentColor" 
      textAnchor="middle" 
      alignmentBaseline="middle"
      letterSpacing="0"
    >
      {name}
    </text>
  </svg>
)

export function Brands() {
  return (
    <section id="partners" className="border-y border-white/10 bg-[#020817] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Technology Partners
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300/70 sm:text-lg">
            Working with leading technology brands to deliver reliable ICT solutions.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3 xl:grid-cols-6">
          {brandNames.map((brand) => (
            <div key={brand} className="group flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-[#071423]/70 px-6 py-6 transition-colors hover:border-[#57d8ef]/35 hover:bg-[#0a182b] sm:h-36 sm:px-10">
              <BrandLogo name={brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
