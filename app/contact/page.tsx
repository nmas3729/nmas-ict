import type { Metadata } from 'next'
import { Contact } from '@/components/contact'
import { PageIntro, PageLayout } from '@/components/page-layout'

export const metadata: Metadata = {
  title: 'Contact and Request a Quote',
  description: 'Contact NMAS Innovations in Benoni, Gauteng, South Africa, or submit an ICT enquiry as an individual customer or organisation.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact and Request a Quote | NMAS Innovations',
    description: 'Contact NMAS Innovations or submit an ICT quote request as an individual customer or organisation.',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <PageLayout>
      <PageIntro
        eyebrow="Contact NMAS"
        title="Contact and Request a Quote"
        description="Send your product requirements or attach an RFQ / Bill of Quantities for procurement support."
        showBackToHome
      />
      <Contact />
    </PageLayout>
  )
}
