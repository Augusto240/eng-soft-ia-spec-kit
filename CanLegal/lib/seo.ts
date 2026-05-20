import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://canlegal.example';

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = path ? `${baseUrl}${path}` : baseUrl;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'CanLegal',
      type: 'website',
    },
  };
}
