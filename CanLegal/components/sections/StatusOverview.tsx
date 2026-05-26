'use client';

import { useMemo, useState } from 'react';

import CountryCard from '@/components/cards/CountryCard';
import WorldMap from '@/components/map/WorldMap';
import { STATUS_OPTIONS } from '@/lib/constants';
import { filterCountries } from '@/lib/filters';
import { getContinents } from '@/lib/data/selectors';
import type { Country, LegalStatus } from '@/lib/data/types';

type OverviewCopy = {
  title: string;
  subtitle: string;
};

type StatusOverviewProps = {
  countries: Country[];
  copy: OverviewCopy;
};

export default function StatusOverview({ countries, copy }: StatusOverviewProps) {
  const [status, setStatus] = useState<LegalStatus | 'all'>('all');
  const [continent, setContinent] = useState('all');
  const [query, setQuery] = useState('');
  const [medicalOnly, setMedicalOnly] = useState(false);
  const [recreationalOnly, setRecreationalOnly] = useState(false);

  const continents = useMemo(() => ['all', ...getContinents(countries)], [countries]);

  const filtered = useMemo(
    () =>
      filterCountries(countries, {
        status,
        continent,
        query,
        medical: medicalOnly,
        recreational: recreationalOnly,
      }),
    [countries, status, continent, query, medicalOnly, recreationalOnly],
  );

  const isFiltered =
    status !== 'all' ||
    continent !== 'all' ||
    query.trim().length > 0 ||
    medicalOnly ||
    recreationalOnly;

  return (
    <section id="overview" className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-muted">Legal status</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{copy.title}</h2>
          <p className="mt-3 text-muted">{copy.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search country"
            aria-label="Search country"
            className="rounded-full border border-line/60 bg-surface/70 px-4 py-2 text-sm"
          />
          <select
            value={continent}
            onChange={(event) => setContinent(event.target.value)}
            aria-label="Select continent"
            className="rounded-full border border-line/60 bg-surface/70 px-4 py-2 text-sm"
          >
            {continents.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All continents' : item}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setMedicalOnly((value) => !value)}
            aria-pressed={medicalOnly}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              medicalOnly
                ? 'border-ink bg-ink text-surface'
                : 'border-line/60 text-muted hover:text-ink'
            }`}
          >
            Medical
          </button>
          <button
            type="button"
            onClick={() => setRecreationalOnly((value) => !value)}
            aria-pressed={recreationalOnly}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
              recreationalOnly
                ? 'border-ink bg-ink text-surface'
                : 'border-line/60 text-muted hover:text-ink'
            }`}
          >
            Recreational
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setStatus(option.value)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                status === option.value
                  ? 'border-ink bg-ink text-surface'
                  : 'border-line/60 text-muted hover:text-ink'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <WorldMap countries={countries} filteredCountries={filtered} isFiltered={isFiltered} />
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{filtered.length} countries in view</span>
        <span>{isFiltered ? 'Filtered view' : 'Full dataset'}</span>
      </div>
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-line/40 bg-surface/70 p-6 text-sm text-muted">
          No countries match the current filters. Try adjusting your search.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </div>
      )}
      <noscript>
        <p className="text-sm text-muted">
          JavaScript is disabled. You can still read the list of countries below.
        </p>
      </noscript>
    </section>
  );
}
