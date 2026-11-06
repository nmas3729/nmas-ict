import type { Metadata } from 'next'
import { Brands } from '@/components/brands'
import { Hero } from '@/components/hero'
import { HomePreviews } from '@/components/home-previews'
import { PageLayout } from '@/components/page-layout'

export const metadata: Metadata = {
  title: { absolute: 'NMAS Innovations | South African ICT Solutions' },
  description: 'South African ICT solutions for organisations and individuals, including genuine hardware sourcing, software licensing and procurement support.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'NMAS Innovations | South African ICT Solutions',
    description: 'Genuine ICT hardware, software licensing and procurement support for organisations and individuals.',
    url: '/',
  },
}

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <Brands />
      <HomePreviews />
    </PageLayout>
  )
}
