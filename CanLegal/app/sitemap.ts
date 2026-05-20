import { getCountries } from '@/lib/data/loaders';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://canlegal.example';
  const countries = getCountries();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...countries.map((country) => ({
      url: `${baseUrl}/countries/${country.code.toLowerCase()}`,
      lastModified: new Date(country.updatedAt),
    })),
  ];
}
