'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type AnalyticsParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (command: string, action: string, params?: AnalyticsParams) => void
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const analyticsEnabled = process.env.NODE_ENV === 'production' && Boolean(measurementId)

export function trackEvent(name: string, params?: AnalyticsParams) {
  if (typeof window === 'undefined' || !analyticsEnabled) return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || ((command, action, eventParams) => {
    window.dataLayer.push([command, action, eventParams])
  })
  window.gtag('event', name, params)
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!analyticsEnabled) return
    const query = searchParams.toString()
    trackEvent('page_view', {
      page_path: `${pathname}${query ? `?${query}` : ''}`,
    })
  }, [pathname, searchParams])

  if (!analyticsEnabled || !measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  )
}
