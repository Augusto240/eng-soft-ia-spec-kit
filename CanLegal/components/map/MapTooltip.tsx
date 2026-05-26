import type { Country } from '@/lib/data/types';
import { STATUS_LABELS, statusChipClass } from '@/lib/constants';

type MapTooltipProps = {
  country: Country;
  position: { x: number; y: number };
};

export default function MapTooltip({ country, position }: MapTooltipProps) {
  const sources = country.sources.slice(0, 2);

  return (
    <div
      className="absolute z-20 w-72 rounded-2xl border border-line/40 bg-surface/95 px-4 py-3 text-xs text-muted shadow-soft"
      style={{ left: position.x, top: position.y, transform: 'translate(12px, -12px)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{country.name}</p>
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusChipClass(country.status)}`}>
          {STATUS_LABELS[country.status]}
        </span>
      </div>
      <p className="mt-1 text-[11px]">{country.region}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            country.medical ? 'bg-ink text-surface' : 'border border-line/60'
          }`}
        >
          Medical
        </span>
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            country.recreational ? 'bg-ink text-surface' : 'border border-line/60'
          }`}
        >
          Recreational
        </span>
      </div>
      <div className="mt-3 grid gap-1 text-[11px]">
        <p>Possession: {country.possessionRule}</p>
        <p>Cultivation: {country.cultivationRule}</p>
        <p>Legalization year: {country.yearOfLegalization ?? 'N/A'}</p>
      </div>
      <div className="mt-3 grid gap-1 text-[11px]">
        {sources.map((source) => (
          <a
            key={source.url}
            className="text-ink underline"
            href={source.url}
            target="_blank"
            rel="noreferrer"
          >
            {source.name}
          </a>
        ))}
      </div>
      <p className="mt-2 text-[11px]">Last updated: {country.lastUpdated}</p>
    </div>
  );
}
