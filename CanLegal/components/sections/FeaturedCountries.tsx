import CountryCard from '@/components/cards/CountryCard';
import type { Country } from '@/lib/data/types';

type FeaturedCopy = {
  title: string;
  subtitle: string;
  codes: string[];
};

type FeaturedCountriesProps = {
  countries: Country[];
  copy: FeaturedCopy;
};

export default function FeaturedCountries({ countries, copy }: FeaturedCountriesProps) {
  const featured = countries.filter((country) => copy.codes.includes(country.code));

  return (
    <section id="featured" className="flex flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-muted">Featured</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
        <p className="mt-3 text-muted">{copy.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((country) => (
          <CountryCard key={country.code} country={country} />
        ))}
      </div>
    </section>
  );
}
