import { STATUS_LABELS, STATUS_OPTIONS, statusColorHex } from '@/lib/constants';
import type { LegalStatus } from '@/lib/data/types';

export default function MapLegend() {
  const legendOptions = STATUS_OPTIONS.filter((option) => option.value !== 'all') as {
    value: LegalStatus;
    label: string;
  }[];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {legendOptions.map((option) => (
        <span key={option.value} className="flex items-center gap-2 text-xs text-muted">
          <span
            className="h-2.5 w-2.5 rounded-full transition-transform duration-300 ease-out"
            style={{ backgroundColor: statusColorHex(option.value) }}
          />
          <span>{STATUS_LABELS[option.value]}</span>
        </span>
      ))}
    </div>
  );
}
