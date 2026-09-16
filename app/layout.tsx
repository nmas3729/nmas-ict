import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nmas.co.za'),
  title: 'NMAS Innovations | South African B2B ICT Supplier',
  description: 'NMAS Innovations supplies brand-new genuine ICT hardware, software licensing and enterprise technology solutions to organisations across South Africa.',
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
  alternates: {
    canonical: 'https://nmas.co.za/',
  },
  openGraph: {
    type: 'website',
    url: 'https://nmas.co.za/',
    title: 'NMAS Innovations | South African B2B ICT Supplier',
    description: 'Genuine ICT hardware, software licensing and procurement support for South African organisations.',
    siteName: 'NMAS Innovations',
    images: [{ url: '/images/hero-enterprise-new.webp', width: 1200, height: 900, alt: 'Enterprise ICT professionals collaborating in a modern boardroom' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NMAS Innovations | South African B2B ICT Supplier',
    description: 'Genuine ICT hardware, software licensing and procurement support for South African organisations.',
    images: ['/images/hero-enterprise-new.webp'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#12204a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-4N04RVFG3L"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4N04RVFG3L');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
