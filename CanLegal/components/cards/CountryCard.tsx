import Link from 'next/link';

import type { Country } from '@/lib/data/types';
import FlagBadge from '@/components/ui/FlagBadge';
import StatusBadge from '@/components/ui/StatusBadge';

type CountryCardProps = {
  country: Country;
};

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="rounded-2xl border border-line/40 bg-surface/80 p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{country.name}</h3>
          <p className="text-sm text-muted">{country.region}</p>
        </div>
        <StatusBadge status={country.status} />
      </div>
      <p className="mt-3 text-sm text-muted">{country.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <FlagBadge label="Medical" enabled={country.medical} />
        <FlagBadge label="Recreational" enabled={country.recreational} />
        <FlagBadge label="Decrim" enabled={country.decriminalized} />
        <FlagBadge label="Cultivation" enabled={country.cultivationAllowed} />
      </div>
      <div className="mt-4 text-xs text-muted">
        <p>Regulator: {country.regulatoryAgency ?? 'Not specified'}</p>
        <p>Last updated: {country.lastUpdated}</p>
        <p>Sources: {country.sources.map((source) => source.name).join(', ')}</p>
      </div>
      <Link
        href={`/countries/${country.code.toLowerCase()}`}
        className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-ink"
      >
        View details
      </Link>
    </article>
  );
}
