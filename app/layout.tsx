import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import { GoogleAnalytics } from '@/components/google-analytics'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nmas.co.za'),
  title: {
    default: 'NMAS Innovations | South African ICT Solutions',
    template: '%s | NMAS Innovations',
  },
  description: 'South African ICT solutions for organisations and individuals, including genuine hardware sourcing, software licensing and procurement support.',
  keywords: [
    'ICT supplier South Africa',
    'enterprise IT procurement',
    'government IT procurement',
    'business laptops',
    'networking equipment',
    'servers',
    'NMAS Innovations',
  ],
  icons: {
    icon: '/images/nmas-logo.png',
    apple: '/images/nmas-logo.png',
    shortcut: '/images/nmas-logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: 'website',
    title: 'NMAS Innovations | South African ICT Solutions',
    description: 'Genuine ICT hardware, software licensing, and procurement support for organisations and individuals.',
    siteName: 'NMAS Innovations',
    images: [{ url: '/images/hero-enterprise-new.webp', width: 1200, height: 900, alt: 'Enterprise ICT professionals collaborating in a modern boardroom' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NMAS Innovations | South African ICT Solutions',
    description: 'Genuine ICT hardware, software licensing, and procurement support for organisations and individuals.',
    images: ['/images/hero-enterprise-new.webp'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050c18',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://nmas.co.za/#organization',
                name: 'NMAS Innovations (Pty) Ltd',
                url: 'https://nmas.co.za/',
                logo: 'https://nmas.co.za/images/nmas-logo.png',
                description: 'South African ICT supplier and reseller providing genuine hardware, software licensing, and technology procurement support for organisations and individuals.',
                telephone: '+27 67 487 7278',
                email: 'hello@nmas.co.za',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Benoni',
                  addressRegion: 'Gauteng',
                  addressCountry: 'ZA',
                },
                identifier: {
                  '@type': 'PropertyValue',
                  name: 'Company Registration No.',
                  value: '2023/727067/07',
                },
                areaServed: 'South Africa',
              },
              {
                '@type': 'WebSite',
                '@id': 'https://nmas.co.za/#website',
                name: 'NMAS Innovations',
                url: 'https://nmas.co.za/',
                publisher: { '@id': 'https://nmas.co.za/#organization' },
              },
            ],
          })}
        </Script>
      </body>
    </html>
  )
}
