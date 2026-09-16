import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nmas.co.za'

  const solutions = [
    'end-user-computing',
    'servers-storage',
    'networking',
    'printing-accessories',
    'collaboration',
    'software-licensing',
  ]

  const solutionUrls = solutions.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...solutionUrls,
  ]
}
