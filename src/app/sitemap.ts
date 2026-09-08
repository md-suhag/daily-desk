import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/race`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/falling`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
