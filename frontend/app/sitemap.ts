import type { MetadataRoute } from 'next';

const locales = ['en', 'ka'];
const paths = ['', '/booking', '/blog', '/contact', '/privacy', '/disclaimer'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7
    }))
  );
}
