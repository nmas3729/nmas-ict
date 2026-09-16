const brandNames = [
  'Dell', 'HP', 'Lenovo', 'Apple', 'Microsoft', 
  'Cisco', 'Aruba', 'Ubiquiti', 'MikroTik', 'Yealink', 
  'Poly', 'Logitech', 'Canon', 'Brother', 'Epson', 
  'Synology', 'Bitdefender', 'Sophos', 'ESET', 'Trend Micro'
]

const BrandLogo = ({ name }: { name: string }) => (
  <svg
    viewBox="0 0 200 60"
    role="img"
    aria-label={`${name} logo`}
    className="h-12 w-full object-contain text-slate-200/85 transition-colors duration-200 group-hover:text-white sm:h-14"
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
    <section className="border-y border-white/10 bg-[#020817] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Trusted Technology Partners
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300/70 sm:text-lg">
          Technology brands supplied through trusted distribution channels.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {brandNames.map((brand) => (
            <div key={brand} className="group flex h-24 items-center justify-center rounded-2xl border border-white/10 bg-[#071423]/65 px-4 py-5 transition-colors hover:border-[#57d8ef]/35 hover:bg-[#0a182b] sm:h-28 sm:px-6">
              <BrandLogo name={brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
