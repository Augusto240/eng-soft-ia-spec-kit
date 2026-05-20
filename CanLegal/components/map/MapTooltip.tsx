import type { Country } from '@/lib/data/types';
import { STATUS_LABELS, statusChipClass } from '@/lib/constants';

type MapTooltipProps = {
  country: Country;
  position: { x: number; y: number };
};

export default function MapTooltip({ country, position }: MapTooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-20 w-64 rounded-2xl border border-line/40 bg-surface/95 px-4 py-3 text-xs text-muted shadow-soft"
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
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${country.medical ? 'bg-ink text-surface' : 'border border-line/60'}`}>
          Medical
        </span>
        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${country.recreational ? 'bg-ink text-surface' : 'border border-line/60'}`}>
          Recreational
        </span>
      </div>
      <p className="mt-3 text-[11px]">Last updated: {country.lastUpdated}</p>
    </div>
  );
}
